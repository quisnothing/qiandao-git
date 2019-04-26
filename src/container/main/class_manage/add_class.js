import React from 'react'
import {Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,message, Menu, Dropdown} from 'antd';
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

class AddClass extends React.Component{
    constructor(){
        super();
        this.state={
            selectedRowKeys : [], //选择的行
            data: [],
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                defaultCurrent: 1,
            },
            visibleChangeModal: false, //当前修改框是否显示
            visibleAddModal: false, //当前添加框是否显示
            currentSelectClass: {  //当前选择的课程
                key: 0,
                name: '',
                sub_code: '',

                place: '',
                location: '',
                time: '',
                stu_count: 0,
                teacher: ''
            },
            classInfo: [], //班级信息
            pathList : ['课程管理','添加课程'],
        };
        this.searchKey = "1";//默认按照班级搜索  1班级 2科目  3状态
        this.turnStatus = "NORMAL"; //NORMAL:正常翻页   SEARCH:搜索翻页
        this.searchContent = ""; //搜索内容

    }

    componentWillMount(){
        //用户已登录时，获取课程列表
        if(!localStorage.getItem("subjects")){
            httpServer({
                url: URL.get_course
            },{
                token: localStorage.getItem("token"),
                uid: localStorage.getItem("uid"),
                type: localStorage.getItem("type")
            }).then((res)=>{
                const data = [];
                for (let i = 0; i < res.data.data.length; i++) {

                    data.push({
                        key: res.data.data[i].course_id,
                        course_name: res.data.data[i].course_name,
                        course_id : res.data.data[i].course_id,
                        teacher: res.data.data[i].teacher,
                        time: res.data.data[i].time
                    });
                }
                this.setState({
                    data: data,
                    pagination : this.state.pagination
                });
                if(1){
                    localStorage.setItem("subjects", JSON.stringify(data));
                }
                console.log(data);
            });
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
        httpServer({
            url: URL.get_course
        },{
            page : this.state.pagination.current,
        }).then((res)=>{
            const data = [];
            for (let i = 0; i < res.data.data.length; i++) {

                data.push({
                    key: res.data.data[i].course_id,
                    course_name: res.data.data[i].course_name,
                    course_id : res.data.data[i].course_id,
                    teacher: res.data.data[i].teacher,
                    time: res.data.data[i].time
                });
            }
            this.setState({
                data:data,
                pagination : this.state.pagination
            })
        });
        console.log('1');

    }

    //选择课程
    handleChange(value) {
        console.log(`selected ${value}`);
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
        this.setState({curSelectClass : record});
        const {form}=this.props;
        //重新设置修改模态框中三个选项的值
        form.setFieldsValue({'name': record.course_name});
        this.setState({visibleChangeModal:true})
    }
    handleTableChange(value){ // 分页、排序、筛选时候触发
        console.log(`selected ${value}`);
    }

    addClass(record){
        this.setState({visibleAddModal:true});
    }
    addCancel(){
        this.setState({visibleAddModal:false});
    }

    changeCancel(){
        this.setState({visibleChangeModal:false});
    }
    searchClass(){  //查询课程

    }
    deleteClass(){

    }
    changeOk(){

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
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="#">课程详情</a>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/main/student_manage/query_student">学生列表</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/main/signin_manage/querySign">签到列表</Link>
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
                        <Dropdown overlay={menu}>
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
                            {/*<Search*/}
                                {/*className="f-r"*/}
                                {/*palceholder="请输入关键字"*/}
                                {/*onSearch={this.searchClass.bind(this)}*/}
                                {/*enterButton*/}
                                {/*style={{width:200}}*/}
                            {/*/>*/}
                            {/*<Select className="f-r m-r-20" defaultValue="1" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>*/}
                                {/*<Option value="1">课程</Option>*/}
                                {/*<Option value="2">代码</Option>*/}
                            {/*</Select>*/}
                            <ButtonGroup className="f-r m-r-20">
                                <Button type="primary" icon="plus"  onClick={this.addClass.bind(this)}/>
                                <Button type="primary" icon="sync" />
                            </ButtonGroup>
                            <Button type="primary" className="f-l" onClick={this.getCourseList.bind(this)}>全部课程</Button>
                        </Col>
                    </Row>
                    <div className="m-t-20">
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            lacale={localObj}
                            onChange={this.handleTableChange.bind(this)}
                        />
                    </div>
                    <Modal
                        title="修改课程"
                        visible={this.state.visibleChangeModal}
                        footer={null}
                        onCancel={this.changeCancel.bind(this)}
                    >
                        <Form onSubmit={this.changeOk.bind(this)}>
                            <FormItem {...formItemLayout} label="课程编号">
                                <span>{this.state.currentSelectClass.key}</span>
                            </FormItem>
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
                            <FormItem {...formItemLayout} label="上课时间">
                                {getFieldDecorator('time', {
                                    initialValue: this.state.currentSelectClass.time
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
                        <Form onSubmit={this.changeOk.bind(this)}>
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
                                    initialValue: this.state.currentSelectClass.time
                                })(
                                    <Input />
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

function mapStateToProps(state) {
    return {
        subjectinfo: state.subjectinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(AddClass))