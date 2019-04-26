import React from 'react'
import { Card,Icon,Layout,Row,Col,Tree,Form,Input,Button } from 'antd';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import * as URL from '../../../component/interfaceURL'
import httpServer from '../../../component/httpServer'
import http from '../../../component/axiosHttp'
import {hex_md5} from "@component/md5";

const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const { TreeNode } = Tree;

let infodata = [
    {
        id:1,
        typeid:1,
        type_level:1,
        type_belong:0,
        info:"福州大学",
    },{
        id:2,
        typeid:1,  //大类别的id
        type_level:1,
        type_belong:0, // 类别从属的父id
        info: "厦门大学",
    },{
        id:3,
        typeid:1,  //大类别id
        type_level:1,
        type_belong:0, // 类别从属的父id
        info: "其他大学",
    },{
        id:11,
        typeid:1,  //大类别id
        type_level:2,
        type_belong:1, // 类别从属的父id
        info: "福大数计学院",
    },{
        id:12,
        typeid:1,  //大类别id
        type_level:2,
        type_belong:1, // 类别从属的父id
        info: "福大经管学院",
    },{
        id:21,
        typeid:1,  //大类别id
        type_level:2,
        type_belong:2, // 类别从属的父id
        info: "厦大数计学院",
    },{
        id:22,
        typeid:1,  //大类别id
        type_level:2,
        type_belong:2, // 类别从属的父id
        info: "厦大金融学院",
    }];

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

class DicList extends React.Component{
    constructor(){
        super();
        this.state = {
            pathList: ['组织管理', '学校列表'],
            selectedSchool: '',  //选中的学校
            selectedSchoolId: '',  //选中学校的id
            selectedInstitute: '',  //选中的学院
            selectedInstituteId: ''  //选中学院的id
        };
        console.log(localStorage.getItem("token"));
    }

    onSelectTreeNode(selectedKeys, info){  //树形组件选择
        this.setState({selectedInstitute: info.node.props.title});  //setState是好东西啊
        //this.state.selectedInstitute = info.node.props.title;
        console.log(info.halfCheckedKeys);
        console.log('selected',selectedKeys, info);  //输出选中的key和对应的类名字
        console.log(buildTree(infodata));
    }

    //获得所有大类
    async getTopTypes(){
        let temp_uid = localStorage.getItem("uid");
        let temp_token = localStorage.getItem("token");
        let temp_type = localStorage.getItem("type");
        //const res = await http.get(URL.get_types, {token: temp_token});
        //console.log(res)
        URL.GetAllTypes(temp_token).then((res)=>{
            console.log("success");
            console.log(res)
        });
        var fd = new FormData();
        var email1 = '1339727588@qq.com';
        fd.append('email', email1);
        // URL.GetEmailCode(email1).then((res)=>{
        //     console.log('success')
        //     console.log(res)
        // })
        //console.log(res.data.result_code);
        console.log(hex_md5('1234567'));
    }
    //选择学校
    selectSchool(schoolName){
        this.setState({selectedSchool:schoolName});
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 6 , offset : 0},
            },
            wrapperCol: {
                xs: { span: 10 },
                sm: { span: 14, offset: 1 },
            },
        };



        const gridStyle = {
            width: '25%',
            textAlign: 'center',
        };
        var items = [];
        const schools = ['福州大学','厦门大学','集美大学','江夏学院','福建师范大学','华侨大学', '闽江学院'];
        for(var i=0; i<schools.length;i++){
            items.push(<Card.Grid style={gridStyle} key={'sc-'+String(i)}><div onClick={this.selectSchool.bind(this, schools[i])}>{schools[i]}</div></Card.Grid>);
        }
        const FZU = ['数计学院','经管学院','建筑学院','电气学院','土木学院','物信学院','外国语学院'];
        var treeItems = [];
        for(var i=0;i<FZU.length;i++){
            treeItems.push(<TreeNode title={FZU[i]} key={'f-0-'+String(i)}/>)
        }
        return(
            <div>
                <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
                <div style={{ padding: 24, minHeight: 280 }}>
                    <Row gutter={16}>
                        <Col md={24} className="gutter-row">
                            <div style={{margin: '10px'}}>
                                <Card title="组织管理">
                                    {/*<Card.Grid style={gridStyle}>福州大学</Card.Grid>*/}
                                    {/*<Card.Grid style={gridStyle}>厦门大学</Card.Grid>*/}
                                    {/*<Card.Grid style={gridStyle}>集美大学</Card.Grid>*/}
                                    {/*<Card.Grid style={gridStyle}>江夏学院</Card.Grid>*/}
                                    {/*<Card.Grid style={gridStyle}>福建师范大学</Card.Grid>*/}
                                    {/*<Card.Grid style={gridStyle}>华侨大学</Card.Grid>*/}
                                    {/*<Card.Grid style={gridStyle}>闽江学院</Card.Grid>*/}
                                    {items}
                                    <Card.Grid style={gridStyle}><Icon type="plus" onClick={this.getTopTypes.bind(this)}/></Card.Grid>
                                </Card>
                            </div>
                        </Col>

                    </Row>

                    <Row gutter={16}>
                        <Col span={6} offset={4}>
                            <div style={{background: '#FFFFFF', margin: '10px'}}>
                                <Tree
                                    showLine
                                    defaultExpandedKeys={['f-0']}
                                    onSelect={this.onSelectTreeNode.bind(this)}
                                >
                                    <TreeNode title={this.state.selectedSchool} key="f-0">
                                        {treeItems}
                                    </TreeNode>
                                </Tree>
                            </div>
                        </Col>
                        <Col span={10}>
                            <div style={{background: '#FFFFFF', margin: '10px'}}>
                                <Form>
                                    <FormItem {...formItemLayout} label="类别名称">
                                        {getFieldDecorator('type_name', {
                                            initialValue: this.state.selectedInstitute,
                                            rules: [{ required: true, message: '请输入正确的类别名称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="类别从属">
                                        {getFieldDecorator('type_belong', {
                                            initialValue: this.state.selectedSchool,
                                            rules: [{ required: true, message: '类别从属不能为空!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <Row type="flex" justify="space-around">
                                        <Col>
                                            <Button type="primary" ghost>修改</Button>
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

export default connect()(Form.create()(DicList))