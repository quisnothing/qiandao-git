import React from 'react'
import {Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,message, Menu, Dropdown, DatePicker} from 'antd';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import { Form } from 'antd';
import * as URL from '../../../component/interfaceURL'
import httpServer from '../../../component/httpServer'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;

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

class AddClass extends React.Component{
    constructor(){
        super();
        this.state={
            selectedRowKeys : [], //选择的行
            data: [],  //课程列表
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                defaultCurrent: 1,
            },
            visibleChangeModal: false, //当前修改框是否显示
            visibleAddModal: false, //当前添加框是否显示
            currentSelectClass: {  //当前选择的课程详情
                course_id: '',
                course_name: '',
                course_code: '',

                place: '',
                location: '',
                time: '',
                stu_count: 0,
                teacher: '',
                creater_id: '',
                check_count: ''
            },
            classInfo: [], //班级信息
            pathList : ['课程管理','添加课程'],
            addTimeStamp: ''
        };
        this.searchKey = "1";//默认按照班级搜索  1班级 2科目  3状态
        this.turnStatus = "NORMAL"; //NORMAL:正常翻页   SEARCH:搜索翻页
        this.searchContent = ""; //搜索内容

    }

    componentWillMount(){
        //用户已登录时，获取课程列表
        if(!localStorage.getItem("subjects")){
            let token = localStorage.getItem("token");
            let uid = localStorage.getItem("uid");
            let type_1 = localStorage.getItem("type");
            URL.GetCourse(token, uid, type_1).then((res)=>{
                if(res.data.result_code === '200'){
                    console.log("success get!");
                    console.log(res.data.data);

                    const data = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        let temp_time = String(res.data.data[i].time);
                        if(temp_time.indexOf("-")=== -1){
                            temp_time = stampToformat(res.data.data[i].time)
                        }
                        data.push({
                            key: res.data.data[i].course_id,
                            course_name: res.data.data[i].course_name,
                            course_id : res.data.data[i].course_id,
                            teacher: res.data.data[i].teacher,
                            time: temp_time
                        });
                    }
                    this.setState({
                        data: data
                    });
                    localStorage.setItem("subjects", JSON.stringify(data));
                }else{
                    console.log("fail get!");
                }
            })
        }
        else{
            const data = JSON.parse(localStorage.getItem("subjects"));
            this.setState({
                data: data
            });
        }

    }

    //获取课程列表
    getCourseList(){
        let token = localStorage.getItem("token");
        let uid = localStorage.getItem("uid");
        let type_1 = localStorage.getItem("type");
        URL.GetCourse(token, uid, type_1).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success get!");
                console.log(res.data);

                const data = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    let temp_time = String(res.data.data[i].time);
                    if(temp_time.indexOf("-")=== -1){
                        temp_time = stampToformat(res.data.data[i].time)
                    }
                    data.push({
                        key: res.data.data[i].course_id,
                        course_name: res.data.data[i].course_name,
                        course_id : res.data.data[i].course_id,
                        teacher: res.data.data[i].teacher,
                        time: temp_time
                    });
                }
                this.setState({
                    data: data
                });
                localStorage.setItem("subjects", JSON.stringify(data));
            }else{
                console.log("fail get!");
                console.log(res.data)
            }
        })
    }

    //选择某一行
    onSelectChange(selectedRowKeys, selectedRows) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys: selectedRowKeys });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(!err){

            }
        })
    }
    //点击修改课程
    changeClass(record){
        //要先利用record.course_id获取选择的课程的详情
        //然后把参数传进模态框
        //TODO : 第一次点击this.state.curSelectClass.class为空
        let t_token = localStorage.getItem("token");
        console.log(record);
        URL.GetCourseInfo(t_token, record.course_id).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success get course_info!");
                this.setState({currentSelectClass: res.data.data});
                const {form}=this.props;
                //重新设置修改模态框中三个选项的值
                form.setFieldsValue({'name': res.data.data.course_name});
                form.setFieldsValue({'place': res.data.data.place});
                //form.setFieldsValue({'time': res.data.data.time});
                form.setFieldsValue({'stu_count': res.data.data.stu_count});
                form.setFieldsValue({'teacher': res.data.data.teacher});
                form.setFieldsValue({'check_count': res.data.data.check_count});
                this.setState({visibleChangeModal:true})
            }
            else{
                console.log(res.data);
                console.log("failed!");
            }
        });


    }
    handleTableChange(value){ // 分页、排序、筛选时候触发
        console.log(`selected ${value}`);
    }

    addClass(record){  //打开添加界面
        this.setState({visibleAddModal:true});
    }
    addCancel(){  //关闭添加界面
        this.setState({visibleAddModal:false});
    }

    changeCancel(){  //关闭修改页面
        this.setState({visibleChangeModal:false});
    }
    searchClass(value){  //搜索课程
        if(value === "") {
            Modal.error({
                content: "搜索内容不能为空！",
                okText : '确定'
            });
            return;
        }
        var new_array = [];
        var j = 0;
        for(let i=0; i<this.state.data.length;i++){
            if(this.state.data[i].course_name.indexOf(value) !== -1){
                new_array[j++] = this.state.data[i];
            }
        }
        //保存
        this.setState({data: new_array}, function () {
            console.log("search finished!")
        })
    }
    deleteClass(record){  //删除课程
        //message.success("暂时没开放此功能！");
        let token1 = localStorage.getItem("token");
        //console.log(record.course_id)
        let type1 = '3';
        URL.DelCourse(token1, type1, record.course_id).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success delete course!");
            }
        })

    }
    changeOk(){  //点击确定，完成修改
        this.props.form.validateFieldsAndScroll((err, values)=>{
            if(!err){
                const role = localStorage.getItem("type");
                // if(role !== 1){ //只有管理员才能增、删、改
                //     message.error("权限不足！");
                //     return;
                // }
                let token1 = localStorage.getItem("token");
                let course_id1 = this.state.currentSelectClass.course_id;
                let course_name1 = values.name;
                let course_code1 = this.state.currentSelectClass.course_code;
                let place1 = values.place;
                let location1 = this.state.currentSelectClass.location;
                let time1 = this.state.addTimeStamp;
                let stu_count1 = values.stu_count;
                let teacher1 = values.teacher;
                let c_count = values.check_count;
                URL.AlterCourse(token1, course_id1, course_name1, course_code1, place1,
                    location1, time1, stu_count1, teacher1, c_count).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("alter success!");
                        this.setState({visibleChangeModal:false});
                    }
                })
            }
        })
    }
    AddOk(){  //点击确定， 完成添加
        this.props.form.validateFieldsAndScroll((err, values)=>{
            if(!err){
                const role = localStorage.getItem("type");
                let token = localStorage.getItem("token");
                let uid = localStorage.getItem("uid");
                let time1 = this.state.addTimeStamp;
                console.log(token);
                console.log(uid);
                URL.CreateCourse(token, uid, values.name, values.place, values.location, time1,
                    values.stu_count, values.teacher).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("success add!");
                        message.success('Processing complete!')
                        this.setState({visibleAddModal:false});
                    }
                    else{
                        console.log("fail add!");
                    }
                })
            }
        })
    }

    dateChange(date, dateString){
        console.log(date, dateString);
        let temp_time = dateString+" 8:29:59";
        temp_time = temp_time.replace(/-/g,'/');
        let time_stamp = new Date(temp_time).getTime();
        console.log(time_stamp);
        this.setState({addTimeStamp: time_stamp});
    }

    render(){
        const { getFieldDecorator } = this.props.form;
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
        //下拉菜单布局
        let path1 = {
            pathname: '/main/student_manage/query_student',
            query: {a:this.state.selectedRowKeys[0]},
        };
        let path2 = {
            pathname: '/main/class_manage/class_info',
            query: {id: this.state.selectedRowKeys[0]},
        };
        let path3 = {
            pathname: '/main/signin_manage/querySign',
            query: {id: this.state.selectedRowKeys[0]},
        }
        //行选择
        const rowSelection = {
            selectedRowKeys : this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to={path2}>课程详情</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={path1}>学生列表</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={path3}>签到列表</Link>
                </Menu.Item>
            </Menu>
        );

        const columns = [
            {
                title:'课程编号',
                dataIndex: 'course_id',
                key: 'course_id',
                render:(text)=>{
                    return (
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                {text} <Icon type="down" />
                            </a>
                        </Dropdown>
                    )
                },
                sorter: (a,b) => a.course_id.length-b.course_id.length,
            },
            {
                title:'课程',
                dataIndex: 'course_name',
                key: 'course_name',
            },
            {
                title:'任课教师',
                dataIndex: 'teacher',
                key: 'teacher',
            },
            {
                title: '上课时间',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                       <Button type="danger" size="small" onClick={this.deleteClass.bind(this,record)}>删除</Button>
                       <Divider type="vertical" />
                       <Button size="small" onClick={this.changeClass.bind(this,record)}>修改</Button>
                   </span>
                )
            }];
        //科目信息
        let subjectArr = [];

        let localObj = {
            emptyText: '暂无数据'
        };
        return (
            <div className="query_class">
                <BreadcrumbCustom pathList={['课程管理','课程信息']}></BreadcrumbCustom>
                <div className="class-manage-content">
                    <Row>
                        <Col span={24}>
                            <Search
                                className="f-r"
                                palceholder="请输入关键字"
                                onSearch={this.searchClass.bind(this)}
                                enterButton
                                style={{width:200}}
                            />
                            <Select className="f-r m-r-20" defaultValue="1" style={{ width: 120 }} >
                                <Option value="1">课程</Option>
                                {/*<Option value="2">代码</Option>*/}
                            </Select>
                            <ButtonGroup className="f-l">
                                <Button type="primary" icon="plus"  onClick={this.addClass.bind(this)}/>
                                <Button type="primary" icon="sync" onClick={this.getCourseList.bind(this)}/>
                            </ButtonGroup>
                            {/*<Button type="primary" className="f-l" onClick={this.getCourseList.bind(this)}>全部课程</Button>*/}
                        </Col>
                    </Row>
                    <div className="m-t-20">
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            lacale={localObj}
                            onChange={this.handleTableChange.bind(this)}
                        />
                        <div>*勾选课程后，可以通过点击查看课程详情、对应的签到情况和学生情况</div>
                    </div>
                    <Modal
                        title="修改课程"
                        visible={this.state.visibleChangeModal}
                        footer={null}
                        onCancel={this.changeCancel.bind(this)}
                    >
                        <Form onSubmit={this.changeOk.bind(this)}>
                            <FormItem {...formItemLayout} label="课程编号">
                                <span>{this.state.currentSelectClass.course_id}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="课程名称">
                                {getFieldDecorator('name', {
                                    initialValue: this.state.currentSelectClass.course_name
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="上课地点">
                                {getFieldDecorator('place', {
                                    initialValue: this.state.currentSelectClass.place
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="上课时间">
                                {getFieldDecorator('time', {

                                })(
                                    <DatePicker onChange={this.dateChange.bind(this)} />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="上课人数">
                                {getFieldDecorator('stu_count', {
                                    initialValue: this.state.currentSelectClass.stu_count
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="授课教师">
                                {getFieldDecorator('teacher', {
                                    initialValue: this.state.currentSelectClass.teacher
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="签到次数">
                                {getFieldDecorator('check_count', {
                                    initialValue: this.state.currentSelectClass.check_count
                                })(
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
                        title="创建课程"
                        visible={this.state.visibleAddModal}
                        footer={null}
                        onCancel={this.addCancel.bind(this)}
                    >
                        <Form onSubmit={this.AddOk.bind(this)}>
                            {/*<FormItem {...formItemLayout} label="课程编号">*/}
                                {/*{getFieldDecorator('sub_code', {*/}
                                    {/*initialValue: this.state.currentSelectClass.sub_code*/}
                                {/*})(*/}
                                    {/*<Input />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            <FormItem {...formItemLayout} label="课程名称">
                                {getFieldDecorator('name', {
                                    initialValue: this.state.currentSelectClass.name
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="上课地点">
                                {getFieldDecorator('place', {
                                    initialValue: this.state.currentSelectClass.place
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="地点定位">
                                {getFieldDecorator('location', {
                                    initialValue: this.state.currentSelectClass.location
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="上课时间">
                                {getFieldDecorator('time', {

                                })(
                                    <DatePicker onChange={this.dateChange.bind(this)} />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="上课人数">
                                {getFieldDecorator('stu_count', {
                                    initialValue: this.state.currentSelectClass.stu_count
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="授课教师">
                                {getFieldDecorator('teacher', {
                                    initialValue: this.state.currentSelectClass.teacher
                                })(
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
                </div>
                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        subjectinfo: state.subjectinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(AddClass))