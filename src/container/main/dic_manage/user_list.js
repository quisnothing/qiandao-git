import React from 'react'
import { Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,message,Form, Cascader } from 'antd';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import httpServer from '../../../component/httpServer'
import * as URL from '../../../component/interfaceURL'

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const ButtonGroup = Button.Group;

class UserList extends React.Component{
    constructor(){
        super();
        this.state={
            selectedRowKeys:[],
            data: [],
            power: [],
            pagination:{
                pageSize:10,
                current:1,
                total:0,
                defaultCurrent:1,
            },
            visibleChangeModal: false,
            currentSelectRole:{
                key:0,
                role:'',
                uid: '',
                role_remarks: '',
                time:''
            },
        };
        this.turnStatus = "NORMAL"; //NORMAL:正常翻页      SEARCH: 搜索翻页

    }

    //得到一页数据
    getPageDate(){
        let token = localStorage.getItem("token");
        let type1 = "1";
        let page1 = this.state.pagination.current;
        let count1 = this.state.pagination.pageSize;
        URL.ManageUsers(token, type1, page1, count1).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success get!");
                const data = [];
                for (let i = 0; i < res.data.data.length; i++){
                    data.push({
                        key: res.data.data[i].uid,
                        uid: res.data.data[i].uid,
                        email: res.data.data[i].email,
                        phone: res.data.data[i].phone,
                        password: res.data.data[i].password,
                        nick_name: res.data.data[i].nick_name,
                        name: res.data.data[i].name,
                        type: res.data.data[i].type,
                        stu_code: res.data.data[i].stu_code,
                        gender: res.data.data[i].gender,
                        school: res.data.data[i].school,
                        department: res.data.data[i].department,
                        profession: res.data.data[i].profession,
                        face_info: res.data.data[i].face_info,
                        avatar: res.data.data[i].avatar,
                        last_login_time: res.data.data[i].last_login_time,
                        reg_time: res.data.data[i].reg_time
                    })
                }
                this.state.pagination.total = res.data.data.length;
                this.setState({
                    data: data,
                    pagination: this.state.pagination
                });
            }
            else{
                console.log("fail get user list!");
            }
        })
    }

    componentWillMount(){
        if(!this.data){
            httpServer({
                url: URL.get_role_list
            },{
                token: localStorage.getItem("token"),
                uid: localStorage.getItem("uid"),
                type: localStorage.getItem("type")
            }).then((res)=>{
                const data = [];
                for (let i = 0; i < res.data.data.length; i++) {

                    data.push({
                        key: res.data.data[i].uid,
                        uid: res.data.data[i].uid,
                        role: res.data.data[i].role,
                        role_remarks : res.data.data[i].role_remarks,
                        time: res.data.data[i].time
                    });
                }
                this.setState({
                    data: data,
                    pagination : this.state.pagination
                });
                // if(!localStorage.getItem("subjects")){
                //     localStorage.setItem("subjects", data);
                // }

            });
        }
    }

    //选择某一行
    onSelectRow(selectedRowKeys){
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        this.setState({selectedRowKeys:selectedRowKeys});
    }

    //取消修改
    changeCancel(){
        this.setState({visibleChangeModal:false});
    }

    //确认修改
    changeOK(){
        this.setState({visibleChangeModal: false});
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){

            }
        });
    }
    //删除角色
    deleteRole(record){
        this.setState({currentSelectRole:record});
        confirm({
            title: '你确定删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk:()=>{

            }
        });
    }
    //点击修改角色
    changeRole(record){
        this.setState({currentSelectRole: record});
        const {form}=this.props;
        form.setFieldsValue({'uid':record.uid});
        form.setFieldsValue({'role':record.role});
        form.setFieldsValue({'role_remarks': record.role_remarks});
        this.setState({visibleChangeModal:true});
    }

    render(){
        const {getFieldDecorator} = this.props.form;

        const columns = [{
            title: 'type',
            dataIndex: 'uid',
            key: 'uid',

        },{
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },{
            title: '备注',
            dataIndex: 'role_remarks',
            key: 'role_remarks',
        },{
            title: '更新时间',
            dataIndex: 'time',
            key: 'time',
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record)=>(
                <span>
                    <Button type="danger" size="small" onClick={this.deleteRole.bind(this)}>删除</Button>
                    <Divider type="vertical"/>
                    <Button size="small" onClick={this.changeRole.bind(this, record)}>修改</Button>
                </span>
            )
        }];
        let localObj = {
            emptyText: '暂无数据',
        };
        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 , offset : 4},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };


        return (
            <div className="user-list">
                <BreadcrumbCustom pathList={['组织管理','角色信息']}></BreadcrumbCustom>
                <div>
                    <Row>
                        <Col span={24}>
                            <ButtonGroup className="f-r m-r-20">
                                <Button type="primary" icon="plus" />
                                <Button type="primary" icon="sync" />
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <div className="m-t-20">
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            locale={localObj}
                        />
                    </div>
                    <Modal
                        title="修改角色信息"
                        visible={this.state.visibleChangeModal}
                        footer={null}
                        onCancel={this.changeCancel.bind(this)}
                    >
                        <Form onSubmit={this.changeOK.bind(this)}>
                            <FormItem {...formItemLayout} label="type">
                                <span>{this.state.currentSelectRole.uid}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="角色">
                                {getFieldDecorator('role', {
                                    initialValue: this.state.currentSelectRole.name
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="备注">
                                {getFieldDecorator('role_remarks', {
                                    initialValue: this.state.currentSelectRole.role_remarks
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <Row>
                                <Col span={24}>
                                    <Button type="primary" className="f-r" htmlType="submit">
                                        确定
                                    </Button>
                                    <Button type="primary" className="f-r m-r-20" onClick={this.changeCancel.bind(this)}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </div>

                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}

export default connect()(Form.create()(UserList))