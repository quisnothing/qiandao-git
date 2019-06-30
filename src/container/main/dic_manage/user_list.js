import React from 'react'
import { Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,message,Form, Cascader, Checkbox } from 'antd';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import {hex_md5} from '../../../component/md5';
import * as URL from '../../../component/interfaceURL'

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const ButtonGroup = Button.Group;

let userlist = [
    {
        uid: 'p0001',
        nick_name: 'yh0001',
        name: 'jack',
        phone: '15900000001',
        gender: '男',
        stu_code: '1800001',
        school: '',
        department: '',
        profession: ''
    },
    {
        uid: 'p0002',
        nick_name: 'yh0002',
        name: 'rose',
        phone: '15900000002',
        gender: '女',
        stu_code: '1800002',
        school: '',
        department: '',
        profession: ''
    },
    {
        uid: 'p0003',
        nick_name: 'yh0003',
        name: 'peter',
        phone: '15900000003',
        gender: '男',
        stu_code: '1800003',
        school: '',
        department: '',
        profession: ''
    },
    {
        uid: 'p0004',
        nick_name: 'yh0004',
        name: 'lucy',
        phone: '15900000004',
        gender: '女',
        stu_code: '1800004',
        school: '',
        department: '',
        profession: ''
    }
];

let powerlist = [
    {
        id: '001',
        uid: 'p0001',
        mUser: 1,
        mCourse: 1,
        mCheck: 1,
        mStudent: 1,
        mDict: 1,
        mManage: 1
    },
    {
        id: '002',
        uid: 'p0002',
        mUser: 1,
        mCourse: 1,
        mCheck: 0,
        mStudent: 1,
        mDict: 0,
        mManage: 0
    },
    {
        id: '003',
        uid: 'p0003',
        mUser: 0,
        mCourse: 1,
        mCheck: 0,
        mStudent: 1,
        mDict: 1,
        mManage: 1
    },
    {
        id: '004',
        uid: 'p0004',
        mUser: 0,
        mCourse: 0,
        mCheck: 0,
        mStudent: 1,
        mDict: 0,
        mManage: 0
    },
]
function stampToformat(nS) {
    var data = new Date(parseInt(nS));
    var Y = data.getFullYear() + '-';
    var M = (data.getMonth()+1 < 10 ? '0'+(data.getMonth()+1) : data.getMonth()+1) + '-';
    var D = data.getDate() + ' ';
    var h = data.getHours() + ':';
    var m = data.getMinutes() + ':';
    var m = data.getMinutes() + ':';
    var s = data.getSeconds();
    //console.log(date);
    let date = Y+M+D;
    return date
}
class UserList extends React.Component{
    constructor(){
        super();
        this.state={
            selectedRowKeys:[],
            data: [],
            power: [],
            selected_power: [],
            pagination:{
                pageSize:10,
                current:1,
                total:0,
                defaultCurrent:1,
            },
            visibleChangeModal: false,
            visibleCreatModal: false,
            visiblePowerModal: false,
            currentSelectRole:{
                key:'',
                uid: '',
                nick_name: '',
                name: '',
                phone: '',
                gender: '',
                stu_code: '',
                school: '',
                department: '',
                profession: ''
            },
            create_user_type: ''
        };
        this.turnStatus = "NORMAL"; //NORMAL:正常翻页      SEARCH: 搜索翻页

    }

    //得到一页数据
    getPageDate(){
        let token = localStorage.getItem("token");
        let inter_type1 = "1";
        let page1 = this.state.pagination.current;
        let count1 = this.state.pagination.pageSize;
        URL.ManageUsers(token, inter_type1, page1, count1).then((res)=>{
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

    //刷新列表
    SyncOption(){
        let token = localStorage.getItem("token");
        let inter_type1 = "1";
        let page1 = 1;
        let count1 = 10;
        URL.ManageUsers(token, inter_type1, page1, count1).then((res)=>{
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

    //处理翻页
    handleTableChange(pagination, filters, sorter){
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager
        });
        if(this.turnStatus === "NORMAL"){
            this.getPageDate()
            this.getAuthority()
        }
    }

    componentWillMount(){
        this.getPageDate()
        this.getAuthority()
        // const data = [];
        // for (let i = 0; i < userlist.length; i++){
        //     data.push({
        //         key: userlist[i].uid,
        //         uid: userlist[i].uid,
        //         nick_name: userlist[i].nick_name,
        //         name: userlist[i].name,
        //         phone: userlist[i].phone,
        //         gender: userlist[i].gender,
        //         stu_code: userlist[i].stu_code,
        //         school: userlist[i].school,
        //         department: userlist[i].department,
        //         profession: userlist[i].profession
        //     });
        // }
        // this.setState({
        //     data: data,
        //     pagination : this.state.pagination
        // });
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
    //取消创建
    addCancel(){
        this.setState({visibleCreatModal:false});
    }

    //确认修改
    changeOK(){
        console.log("start alter");
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(1){
                let token1 = localStorage.getItem("token");
                let inter_type = '2';
                let uid = this.state.currentSelectRole.key;
                let nick_name = values.nick_name;
                let phone = values.phone;
                let gender = values.gender;
                let stu_code = values.stu_code;
                let school = values.school;
                let department = values.department;
                let profession = values.profession;
                let email = "";
                let name = "";
                let password = "";
                let type = "";

                URL.ManageUsers(token1, inter_type, 1, 20, uid, nick_name, phone, gender, stu_code,
                    school, department, profession, email, password, type, name).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("alter success!");
                        this.setState({visibleChangeModal:false});
                    }
                })
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
                let token1 = localStorage.getItem("token");
                let inter_type = '3';
                let uid = record.key;
                console.log(uid);
                URL.ManageUsers(token1, inter_type, 1, 20, uid).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("delete success!");
                        //this.setState({visibleChangeModal:false});
                    }
                })
            }
        });
    }
    //确认创建
    addOK(){
        //this.setState({visibleChangeModal: false});
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                let token1 = localStorage.getItem("token");
                let inter_type = '4';
                let uid = '0';
                let nick_name = '0';
                let gender = '0';
                let email = values.email;
                let name = values.name;
                let password = values.password;
                let phone = values.phone;
                let type = this.state.create_user_type;
                let stu_code = values.stu_code;
                let school = values.school;
                let department = values.department;
                let profession = values.profession;
                URL.ManageUsers(token1, inter_type, 1, 20, uid, nick_name, phone, gender, stu_code,
                    school, department, profession, email, password, type, name).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("alter success!");
                        this.setState({visibleCreatModal:false});
                    }
                })
            }
        });
    }
    //点击打开修改角色框
    changeRole(record){
        console.log(record);
        this.setState({currentSelectRole: record});
        const {form}=this.props;

        this.setState({visibleChangeModal:true});
    }
    //点击打开创建用户框
    createRole(record){
        this.setState({visibleCreatModal: true});
    }
    //处理类型选择
    handleChange(value){
        this.setState({create_user_type: value});
        console.log(value);
    }
    //获取用户权限
    getAuthority(){
        let token1 = localStorage.getItem("token");
        let page1 = this.state.pagination.current;
        let count1 = this.state.pagination.pageSize;
        console.log(page1, count1);
        URL.GetPower(token1, page1, count1).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("获取权限成功");
                message.success("成功获取权限");
                this.setState({power: res.data.data}, function () {
                    console.log(res.data.data)
                });
            }
        })
    }

    //打开修改权限框
    AlterAuthority(record){
        console.log(record);
        this.setState({currentSelectRole: record});

        this.setState({visiblePowerModal: true});
    }
    //取消修改权限
    powerCancel(){
        this.setState({visiblePowerModal: false});
    }
    //修改权限
    powerOK(){
        //先找到对应uid的id
        let search_id = '';
        let mUser = '0';
        let mCourse = '0';
        let mCheck = '0';
        let mStudent = '0';
        let mDict = '0';
        let mManage = '0';
        for(let i=0; i<this.state.power.length;i++){
            if(this.state.power[i].uid === this.state.currentSelectRole.key){
                search_id = this.state.power[i].id;
                console.log(search_id);
                break;
            }
        }
        //再调整对应的权限
        console.log(this.state.selected_power);
        for (let i=0; i<this.state.selected_power.length; i++){
            if(this.state.selected_power[i] === 'mUser'){
                mUser = '1';
            }
            else if(this.state.selected_power[i] === 'mCourse'){
                mCourse = '1';
            }
            else if(this.state.selected_power[i] === 'mCheck'){
                mCheck = '1';
            }
            else if(this.state.selected_power[i] === 'mStudent'){
                mStudent = '1';
            }
            else if(this.state.selected_power[i] === 'mDict'){
                mDict = '1';
            }
            else if(this.state.selected_power[i] === 'mManage'){
                mManage = '1';
            }
        }
        //最后通过接口
        let token1 = localStorage.getItem("token");
        URL.AlterPower(token1, search_id, mUser, mCourse, mCheck, mStudent, mDict, mManage).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("修改用户权限成功");
                message.success("成功修改用户权限");
                this.setState({visiblePowerModal: false});
            }
        })
    }
    //查看权限选择情况
    onAuthorityChange(checkvalues){
        console.log('checked=', checkvalues);

        this.setState({selected_power: checkvalues});
    }

    render(){
        const {getFieldDecorator} = this.props.form;

        const columns = [
            {
                title: '编号',
                dataIndex: 'key',
                key: 'key'
            },
            {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',

        },{
            title: '昵称',
            dataIndex: 'nick_name',
            key: 'nick_name',
        },{
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: '学校',
            dataIndex: 'school',
            key: 'school',
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record)=>(
                <span>
                    <Button type="danger" size="small" onClick={this.deleteRole.bind(this, record)}>删除</Button>
                    <Divider type="vertical"/>
                    <Button size="small" onClick={this.changeRole.bind(this, record)}>修改用户信息</Button>
                    <Divider type="vertical"/>
                    <Button type="dashed" onClick={this.AlterAuthority.bind(this, record)}>修改用户权限</Button>
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
        //权限
        const authoriry_options = [
            {label: '用户管理', value: 'mUser'},
            {label: '课程管理', value: 'mCourse'},
            {label: '签到表管理', value: 'mCheck'},
            {label: '学生表管理', value: 'mStudent'},
            {label: '数据字典管理', value: 'mDict'},
            {label: '管理员管理', value: 'mManage'}
        ]

        return (
            <div className="user-list">
                <BreadcrumbCustom pathList={['组织管理','角色信息']}></BreadcrumbCustom>
                <div>
                    <Row>
                        <Col span={24}>
                            <ButtonGroup className="f-r m-r-20">
                                <Button type="primary" icon="plus" onClick={this.createRole.bind(this)}/>
                                <Button type="primary" icon="sync" onClick={this.SyncOption.bind(this)}/>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <div className="m-t-20">
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            locale={localObj}
                            onChange={this.handleTableChange.bind(this)}
                        />
                        <div>*权限的修改仅限于管理员账号，教师及学生用户不开放此功能</div>
                    </div>
                    <Modal
                        title="修改用户信息"
                        visible={this.state.visibleChangeModal}
                        footer={null}
                        onCancel={this.changeCancel.bind(this)}
                    >
                        <Form onSubmit={this.changeOK.bind(this)}>
                            <FormItem {...formItemLayout} label="uid">
                                {getFieldDecorator('uid', {

                                })(
                                    <span>{this.state.currentSelectRole.uid}</span>
                                )
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="昵称">
                                {getFieldDecorator('nick_name', {
                                    rules:[{required:true}],
                                    initialValue: this.state.currentSelectRole.nick_name
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="手机号">
                                {getFieldDecorator('phone', {
                                    rules:[{required:true}],
                                    initialValue: this.state.currentSelectRole.phone
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="性别">
                                {getFieldDecorator('gender', {
                                    rules:[{required:true}],
                                    initialValue: this.state.currentSelectRole.gender
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="学号">
                                {getFieldDecorator('stu_code', {
                                    rules:[{required:true}],
                                    initialValue: this.state.currentSelectRole.stu_code
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="学校">
                                {getFieldDecorator('school', {
                                    rules:[{required:true}],
                                    initialValue: this.state.currentSelectRole.school
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="学院">
                                {getFieldDecorator('department', {
                                    rules:[{required:true}],
                                    initialValue: this.state.currentSelectRole.department
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="专业">
                                {getFieldDecorator('profession', {
                                    rules:[{required:true}],
                                    initialValue: this.state.currentSelectRole.profession
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
                    <Modal
                        title="创建用户信息"
                        visible={this.state.visibleCreatModal}
                        footer={null}
                        onCancel={this.addCancel.bind(this)}
                    >
                        <Form onSubmit={this.addOK.bind(this)}>
                            <FormItem {...formItemLayout} label="用户名">
                                {getFieldDecorator('email', {
                                    rules:[{required:true, message: '请输入用户名'}],
                                })(
                                    <Input />
                                )
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="姓名">
                                {getFieldDecorator('name', {
                                    rules:[{required:true, message: '请输入姓名'}],
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="手机号">
                                {getFieldDecorator('phone', {
                                    rules:[{required:true, message: '请输入手机号'}],
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="密码">
                                {getFieldDecorator('password', {
                                    rules:[{required:true, message: '请输入密码'}],
                                }) (
                                    <Input type="password" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="用户类型">
                                {getFieldDecorator('type', {
                                    rules:[{required:true, message: '请选择用户类型'}],
                                }) (
                                    <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                                        <Option value="3" key="3">学生</Option>
                                        <Option value="2" key="2">教师</Option>
                                        <Option value="1" key="1">管理员</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="学号">
                                {getFieldDecorator('stu_code', {

                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="学校">
                                {getFieldDecorator('school', {
                                    rules:[{required:true, message: '请输入学校'}],
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="学院">
                                {getFieldDecorator('department', {

                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="专业">
                                {getFieldDecorator('profession', {

                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <Row>
                                <Col span={24}>
                                    <Button type="primary" className="f-r" htmlType="submit">
                                        确定
                                    </Button>
                                    <Button type="primary" className="f-r m-r-20" onClick={this.addCancel.bind(this)}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <Modal
                        title="修改用户权限"
                        visible={this.state.visiblePowerModal}
                        footer={null}
                        onCancel={this.powerCancel.bind(this)}
                    >
                        <Form onSubmit={this.powerOK.bind(this)}>
                            <FormItem {...formItemLayout} label="uid">
                                {getFieldDecorator('uid', {

                                })(
                                    <span>{this.state.currentSelectRole.uid}</span>
                                )
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="权限">
                                {getFieldDecorator('authority',{

                                })(
                                    <Checkbox.Group options={authoriry_options} onChange={this.onAuthorityChange.bind(this)}/>
                                )}
                            </FormItem>
                            {/*<FormItem {...formItemLayout} label="用户管理权限">*/}
                            {/*    {getFieldDecorator('mUser', {*/}
                            {/*        rules:[{required:true, message: '请选择用户管理权限'}],*/}
                            {/*    }) (*/}
                            {/*        <Select style={{ width: '100%' }} onChange={this.handleMUserChange.bind(this)}>*/}
                            {/*            <Option value="0" key="0">否</Option>*/}
                            {/*            <Option value="1" key="1">是</Option>*/}
                            {/*        </Select>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            {/*<FormItem {...formItemLayout} label="课程管理权限">*/}
                            {/*    {getFieldDecorator('mCourse', {*/}
                            {/*        rules:[{required:true, message: '请选择课程管理权限'}],*/}
                            {/*    }) (*/}
                            {/*        <Select style={{ width: '100%' }} onChange={this.handleMCourseChange.bind(this)}>*/}
                            {/*            <Option value="0" key="0">否</Option>*/}
                            {/*            <Option value="1" key="1">是</Option>*/}
                            {/*        </Select>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            {/*<FormItem {...formItemLayout} label="签到表管理权限">*/}
                            {/*    {getFieldDecorator('mUser', {*/}
                            {/*        rules:[{required:true, message: '请选择签到管理权限'}],*/}
                            {/*    }) (*/}
                            {/*        <Select style={{ width: '100%' }} onChange={this.handleMCheckChange.bind(this)}>*/}
                            {/*            <Option value="0" key="0">否</Option>*/}
                            {/*            <Option value="1" key="1">是</Option>*/}
                            {/*        </Select>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            {/*<FormItem {...formItemLayout} label="学生表管理权限">*/}
                            {/*    {getFieldDecorator('mUser', {*/}
                            {/*        rules:[{required:true, message: '请选择学生表管理权限'}],*/}
                            {/*    }) (*/}
                            {/*        <Select style={{ width: '100%' }} onChange={this.handleMStudentChange.bind(this)}>*/}
                            {/*            <Option value="0" key="0">否</Option>*/}
                            {/*            <Option value="1" key="1">是</Option>*/}
                            {/*        </Select>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            {/*<FormItem {...formItemLayout} label="数据字典管理权限">*/}
                            {/*    {getFieldDecorator('mUser', {*/}
                            {/*        rules:[{required:true, message: '请选择数据字典管理权限'}],*/}
                            {/*    }) (*/}
                            {/*        <Select style={{ width: '100%' }} onChange={this.handleMDictChange.bind(this)}>*/}
                            {/*            <Option value="0" key="0">否</Option>*/}
                            {/*            <Option value="1" key="1">是</Option>*/}
                            {/*        </Select>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            <Row>
                                <Col span={24}>
                                    <Button type="primary" className="f-r" htmlType="submit">
                                        确定
                                    </Button>
                                    <Button type="primary" className="f-r m-r-20" onClick={this.powerCancel.bind(this)}>
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