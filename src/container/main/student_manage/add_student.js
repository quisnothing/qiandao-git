import React from 'react';
import { Form, Input, Select, Row, Col, Button, Breadcrumb } from 'antd';
import {connect} from 'react-redux'
import * as URL from '../../../component/interfaceURL'
import httpServer from '../../../component/httpServer'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;


class AddStudent extends React.Component{
    constructor(){
        super();
        this.state={
            pathList: ['学生管理', '添加学生到课程'], //面包屑路径
            subjects: [],
            selectCourseId: ''
        }
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
                    console.log(res.data);

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
                        subjects: data
                    });
                    console.log(data);
                    localStorage.setItem("subjects", JSON.stringify(data));
                }else{
                    console.log("fail get!");
                }
            })
        }
        else{
            this.setState({
                subjects: JSON.parse(localStorage.getItem('subjects')),

            });
            console.log(JSON.parse(localStorage.getItem('subjects')));
        }
    }
    handleChange(value){
        console.log(`selected ${value}`);
        this.setState({selectCourseId: value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if (!err){
                let token1 = localStorage.getItem("token");
                let courseId = this.state.selectCourseId;
                URL.AddStuToCourse(token1, values.stu_code, values.email, values.phone, courseId).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("success to add student to course!");
                    }
                })
                console.log('submit!');
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
        //课程信息
        let subjectArr = [];
        for(var i=0;i<this.state.subjects.length;i++){
            subjectArr.push(<Option value={this.state.subjects[i].course_id} key={this.state.subjects[i].key}>{this.state.subjects[i].course_name}</Option>)
        }

        return (
            <div>
                <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
                <div className="add-student-content">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem {...formItemLayout} label="学号">
                            {getFieldDecorator('stu_code', {
                                rules:[{required: true, message: '请输入学号'}],
                            }) (
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Email">
                            {getFieldDecorator('email', {
                                rules:[{message: '请输入email'}],
                            }) (
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="手机号">
                            {getFieldDecorator('phone', {
                                rules:[{message: '请输入手机号'}],
                            }) (
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="课程" key="subject">
                            {getFieldDecorator('class', {
                                rules:[{required:true, message: '请选择课程'}],
                            }) (
                                <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                                    {subjectArr}
                                </Select>
                            )}
                        </FormItem>
                        <Row>
                            <Col span={12} offset={4}>
                                <Button type="primary" htmlType="submit" className="f-r">添加</Button>
                            </Col>
                        </Row>
                    </Form>
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
        classinfo: state.classinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(AddStudent))