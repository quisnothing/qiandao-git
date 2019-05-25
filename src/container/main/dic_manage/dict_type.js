import React from 'react'
import { Card,Icon,Layout,Row,Col,Tree,Form,Input,Button,Select,Modal } from 'antd';
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
let result = []; //保存当前选中的具体类别的所有信息(type_level, type_belong...)

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
//将原始数据整合成树结构
function buildTree(list){
    let temp = {};
    let tree = {};
    for(let i in list){
        temp[list[i].id] = list[i];
    }
    for(let i in temp){
        if(temp[i].type_belong) {
            if(!temp[temp[i].type_belong].children) {
                temp[temp[i].type_belong].children = new Object();
            }
            temp[temp[i].type_belong].children[temp[i].id] = temp[i];
        } else {
            tree[temp[i].id] =  temp[i];
        }
    }
    return tree;
}

class DictType extends React.Component{
    constructor(){
        super();
        this.state={
            pathList: ['组织管理', '字典列表'],
            divheight: 280,
            selectedTypeId: '', //当前选定的大类Id
            selectedInfoId: '', //当前选定的类别id
            ModalTypeId: '', //Modal框的选择框
            typedata: [],
            treeData: [
                {info: '福州大学', id: 0, key: 'fzu'},
                {info: '厦门大学', id: 1, key: 'Xmu'},
                {info: '其他大学', id: 2, key: 'oru', children:[
                    {info: '其他学院', id: 3, key: 'ort'}
                ]},
            ],

            visibleOptionModal: false, //大类修改新增删除框是否显示
            ref_old_info: '',
            ref_new_info: '',
            ref_belong: '',
        };
    }
    handleSelect(value){
        // 选择大类后，根据typeid获得所有具体类别信息，并整合成树结构
        console.log(value); // value:typeid
        if(value === 'lucy'){
            this.setState({visibleOptionModal: true});
        }
        else{
            this.setState({selectedTypeId: value});
            let temp_token = localStorage.getItem("token");
            URL.GetTypeChild(temp_token, value).then((res)=>{
                if(res.data.result_code === '200'){
                    console.log("success get type!");

                    const data = []; //添加title,value,key
                    for (let i = 0; i < res.data.data.length; i++) {

                        data.push({
                            title: res.data.data[i].info,
                            value: res.data.data[i].id,
                            key: res.data.data[i].id,
                            id:res.data.data[i].id,
                            typeid: res.data.data[i].typeid,
                            type_level : res.data.data[i].type_level,
                            type_belong: res.data.data[i].type_belong,
                            info: res.data.data[i].info
                        });
                    }

                    let t_tree = buildTree(data);
                    console.log(t_tree);
                    //this.setState({treeData: t_tree});
                }
                else{
                    console.log("fail!");
                    console.log(res);
                }
            })
        }

    }
    handleSelect2(value){
        //处理modal模块内的选择框，value传入的是typeId
        console.log(value)
        this.setState({ModalTypeId: value});
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
        var temp_tops = localStorage.getItem("Toptypes");
        if(this.state.typedata !== temp_tops){
            var temp_token = localStorage.getItem("token");
            URL.GetAllTypes(temp_token).then((res)=>{
                if(res.data.result_code === '200'){
                    console.log("success get type!");
                    this.setState({typedata: res.data.data});
                    //保存在本地
                    localStorage.setItem("Toptypes", JSON.stringify(res.data.data));
                }
                console.log(res.data.data)

            });
        }
        else{
            const data = JSON.parse(localStorage.getItem("Toptypes"));
            this.setState({typedata: data});
            console.log(data)
        }

    }

    onLoadData(treeNode){
        return new Promise((resolve)=>{
            if (treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                // treeNode.props.dataRef.children = [
                //     { info: '数计学院', type: 1, id: `${treeNode.props.eventKey}-0`, key: `${treeNode.props.eventKey}-0`},
                //     { info: '经管学院', type: 1, id: `${treeNode.props.eventKey}-1`,key: `${treeNode.props.eventKey}-1`},
                // ];
                // this.setState({
                //     treeData: [...this.state.treeData],
                // });
                // resolve();
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
    //保存类别旧称输入框的数据
    handleOldTypeChange(e){
        this.setState({ref_old_info: e.target.value}, function () {
            console.log(this.state.ref_old_info)
        });
    }
    //保存类别新称输入框的数据
    handleNewTypeChange(e){
        this.setState({ref_new_info: e.target.value}, function () {
            console.log(this.state.ref_new_info)
        });
    }
    //保存类别从属输入框的数据
    handleTypeBelongChange(e){
        this.setState({ref_belong: e.target.value}, function () {
            console.log(this.state.ref_belong)
        });
    }

    //修改具体类别信息
    AlterInfo(){
        //console.log(this.state.ref_old_info.props.value);
        const newinfo = this.state.ref_new_info;
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

    //创建具体类别信息
    CreateInfos(){
        //点击左侧树拿到父节点的全部信息后,type_level+1
        let token = localStorage.getItem("token");
        URL.GetInfoByName(this.state.ref_belong).then((res)=>{
            let type_level = String(+(res.data.data[0].type_level)+1);
            let type_belong = res.data.data[0].typeid;
            let typeid = this.state.selectedTypeId;
            let newinfo = this.state.ref_new_info;
            URL.CreateInfo(token, typeid, type_level, type_belong, newinfo).then((res)=>{
                if(res.data.result_code === '200'){
                    console.log("success create!");
                    //message.success('Processing complete!')
                }
            })
        });
        // let type_level = result[0].type_level;
        // type_level = String((+type_level)+ 1);
        // let typeid = result[0].typeid;
        // let type_belong = result[0].type_belong;
        // let newinfo = this.state.ref_new_info;
        // URL.CreateInfo(token, typeid, type_level, type_belong, newinfo).then((res)=>{
        //     if(res.data.result_code === '200'){
        //         console.log("success create!");
        //         //message.success('Processing complete!')
        //     }
        // })
    }

    //删除具体类别
    DeleteInfos(){
        let token = localStorage.getItem("token");
        let infoid = result[0].id;
        URL.DelTypeInfo(token, infoid).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success delete!");
                //message.success('Processing complete!')
            }
        })
    }
    //取消修改
    OptionCancel(){
        this.setState({visibleOptionModal:false})
    }
    //修改大类
    AlterTypes(){
        let t_typename = this.state.ref_new_info;
        let token = localStorage.getItem("token");
        URL.AlterType(token, t_typename, this.state.ModalTypeId).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success alter toptype!");
                //message.success('Processing complete!')
                this.setState({visibleOptionModal:false})
            }
        })
    }
    //新增大类
    CreateTop(){
        let t_typename = this.state.ref_new_info;
        let token = localStorage.getItem("token");
        URL.CreateType(token, t_typename).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success add toptype!");
                //message.success('Processing complete!')
                this.setState({visibleOptionModal:false})
            }
        })
    }
    //删除大类
    DeleteTop(){
        let token = localStorage.getItem("token");
        URL.DelType(token, this.state.ModalTypeId).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success delete toptype!");
                //message.success('Processing complete!')
                this.setState({visibleOptionModal:false})
            }
        })
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
                                        {TopTypes}
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
                                            <Input onChange={this.handleOldTypeChange.bind(this)} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="类别新称">
                                        {getFieldDecorator('type_new_name', {

                                            rules: [{ required: true, message: '请输入正确的类别名称!' }],
                                        })(
                                            <Input  onChange={this.handleNewTypeChange.bind(this)} />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="类别从属">
                                        {getFieldDecorator('type_belong', {

                                            rules: [{ required: true, message: '类别从属不能为空!' }],
                                        })(
                                            <Input onChange={this.handleTypeBelongChange.bind(this)} />
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
                <Modal
                    title="修改/新增/删除大类"
                    visible={this.state.visibleOptionModal}
                    onCancel={this.OptionCancel.bind(this)}
                >
                    <Form>
                        <FormItem {...formItemLayout} label="类别旧称">
                            <Select style={{ width: 120 }} onChange={this.handleSelect2.bind(this)}>
                                {TopTypes}
                            </Select>
                        </FormItem>
                        <FormItem {...formItemLayout} label="类别新称">
                            {getFieldDecorator('type_new_name', {

                                rules: [{ required: true, message: '请输入正确的类别名称!' }],
                            })(
                                <Input  onChange={this.handleNewTypeChange.bind(this)} />
                            )}
                        </FormItem>
                        <Row type="flex" justify="center">
                            <Col>
                                <Button type="primary" ghost onClick={this.AlterTypes.bind(this)}>修改</Button>
                            </Col>
                            <Col>
                                <Button type="primary" ghost onClick={this.CreateTop.bind(this)}>新增</Button>
                            </Col>
                            <Col>
                                <Button type="danger" ghost onClick={this.DeleteTop.bind(this)}>删除</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}

export default connect()(Form.create()(DictType))