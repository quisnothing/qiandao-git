import React from 'react'
import { Card,Icon,Layout,Row,Col,Tree,Form,Input,Button,Select } from 'antd';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import * as URL from '../../../component/interfaceURL'
import httpServer from '../../../component/httpServer'
import http from '../../../component/axiosHttp'
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const { TreeNode } = Tree;
const Option = Select.Option;
let result = [];

// 已知点击树节点可以获得该节点的id(infoid),所以需要找出其从属父节点的id(infoid)
// 根据输入的信息查找treeData中符合id的item,因为用info可能会重名，所以用id
function FilterObj(item, keys){
    if(item.id === keys){
        console.log(item.id);
        result.push(item);

    }
    else if(item.hasOwnProperty("children")){
        item.children.filter(function (child) {
            FilterObj(child, keys);
        })
    }
}
class DictType extends React.Component{
    constructor(){
        super();
        this.state={
            pathList: ['组织管理', '字典列表'],
            divheight: 280,
            selectedTypeId: '', //当前选定的大类Id
            selectedInfoId: '', //当前选定的类别id
            typedata: [],
            treeData: [
                {info: '福州大学', id: 0, key: 'fzu'},
                {info: '厦门大学', id: 1, key: 'Xmu'},
                {info: '其他大学', id: 2, key: 'oru', children:[
                    {info: '其他学院', id: 3, key: 'ort'}
                ]},
            ],

            ref_old_info: '',
            ref_new_info: '',
            ref_belong: '',
        };
    }
    handleSelect(value){
        // 选择大类后，根据typeid获得具体类别信息，并整合成树结构
        console.log(value); // value:typeid
        this.setState({selectedTypeId: value});
    }

    //点击树节点进行具体类别选择
    SelectTreeNode(selectedKeys, info){
        console.log(this.state.treeData);
        result = [];
        var treedata = this.state.treeData;
        treedata.filter(function(item){
            FilterObj(item, 'fzu-0');
            console.log(result);
        });
        this.setState({selectedInfoId: selectedKeys});
        console.log('selected',selectedKeys, info);
    }

    componentWillMount(){
        //渲染前先取得所有大类信息
        if(!localStorage.getItem("Toptypes")){
            var temp_token = localStorage.getItem("token");
            URL.GetAllTypes(temp_token).then((res)=>{
                if(res.data.result_code === '200'){
                    console.log("success get type!");
                    this.setState({typedata: res.data.data});
                    //保存在本地
                    localStorage.setItem("Toptypes", JSON.stringify(res.data.data));
                }

            });
        }
        else{
            const data = JSON.parse(localStorage.getItem("Toptypes"));
            this.setState({typedata: data});
        }

    }

    onLoadData(treeNode){
        return new Promise((resolve)=>{
            if (treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                treeNode.props.dataRef.children = [
                    { info: '数计学院', type: 1, id: `${treeNode.props.eventKey}-0`, key: `${treeNode.props.eventKey}-0`},
                    { info: '经管学院', type: 1, id: `${treeNode.props.eventKey}-1`,key: `${treeNode.props.eventKey}-1`},
                ];
                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
        })
    }

    renderTreeNodes(data){
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.info} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.info} key={item.key} dataRef={item} />;
        })
    }

    //修改具体类别信息
    AlterInfo(){
        //console.log(this.state.ref_old_info.props.value);
        const newinfo = this.state.ref_new_info.props.value;
        //从result中取出要修改的info记录
        // let token = localStorage.getItem("token");
        // let type_level = result[0].type_level;
        // let infoid = result[0].id;
        // let type_belong = result[0].type_belong;
        // URL.AlterInfos(token, type_level, infoid, type_belong, newinfo).then((res)=>{
        //     if(res.data.result_code === '200'){
        //         console.log("success register!");
        //         message.success('Processing complete!')
        //     }
        // })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: {span:24},
                sm:{span:4, offset:4},
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:8},
            },
        };

        //大类信息
        let TopTypes = [];
        for(var i=0;i<this.state.typedata.length;i++){
            TopTypes.push(<Option value={this.state.typedata[i].typeid} key={this.state.typedata[i].typeid}>{this.state.typedata[i].typename}</Option>)
        }

        return(
            <div>
                <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
                <div style={{ padding: 24, minHeight: 280 }} ref="thisDiv">
                    <Row>
                        <Col span={14} offset={16}>
                            <Form>
                                <FormItem {...formItemLayout} label="字典大类">
                                    <Select style={{ width: 120 }} onChange={this.handleSelect.bind(this)}>
                                        <Option value="school_info">学校信息</Option>
                                        <Option value="lucy">其他信息</Option>

                                    </Select>
                                </FormItem>
                            </Form>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div style={{background: '#FFFFFF', margin: '2px', minHeight: 360}}>
                                <Tree
                                    onSelect={this.SelectTreeNode.bind(this)}
                                    loadData={this.onLoadData.bind(this)}
                                >
                                    {this.renderTreeNodes(this.state.treeData)}
                                </Tree>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div style={{background: '#FFFFFF', margin: '2px', minHeight: 360}}>
                                <div style={{marginRight:'2px', float: 'right'}}><Icon type="reload" /></div>
                                <Form>
                                    <FormItem {...formItemLayout} label="类别旧称">
                                        {getFieldDecorator('type_old_name', {

                                        })(
                                            <Input ref={name=>this.state.ref_old_info=name} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="类别新称">
                                        {getFieldDecorator('type_new_name', {

                                            rules: [{ required: true, message: '请输入正确的类别名称!' }],
                                        })(
                                            <Input  ref={name=>this.state.ref_new_info=name} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="类别从属">
                                        {getFieldDecorator('type_belong', {

                                            rules: [{ required: true, message: '类别从属不能为空!' }],
                                        })(
                                            <Input ref={name=>this.state.ref_belong=name} />
                                        )}
                                    </FormItem>
                                    <Row type="flex" justify="center">
                                        <Col>
                                            <Button type="primary" ghost onClick={this.AlterInfo.bind(this)}>修改</Button>
                                        </Col>
                                        <Col>
                                            <Button type="primary" ghost>新增</Button>
                                        </Col>
                                        <Col>
                                            <Button type="danger" ghost>删除</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}

export default connect()(Form.create()(DictType))