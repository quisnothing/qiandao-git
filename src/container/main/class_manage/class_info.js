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

class ClassInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            pathList : ['课程管理', '课程详情'],
            curClass: [],
        };
    }

    componentWillMount(){
        let data = this.props.location.query;
        //通过传递过来的course_id获取对应的课程详情
        let token1 = localStorage.getItem("token");
        URL.GetCourseInfo(token1, data.id).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success get class info!");

                this.setState({curClass: res.data.data});
                console.log(res.data);
            }
            else if(res.data.result_code === '206'){
                console.log("token time out!");
                message.error("token time out!");
            }else{
                console.log(res.data);
            }
        })
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

        return(
            <div>
                <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
                <div>
                    <Form>
                        <FormItem {...formItemLayout} label="课程编号">
                            <span>{this.state.curClass.course_id}</span>
                        </FormItem>
                        <FormItem {...formItemLayout} label="课程名称">
                            <span>{this.state.curClass.course_name}</span>
                        </FormItem>
                        <FormItem {...formItemLayout} label="课程代码">
                            <span>{this.state.curClass.course_code}</span>
                        </FormItem>
                        <FormItem {...formItemLayout} label="地点">
                            <span>{this.state.curClass.place}</span>
                        </FormItem>
                        <FormItem {...formItemLayout} label="上课时间">
                            <span>{this.state.curClass.time}</span>
                        </FormItem>
                        <FormItem {...formItemLayout} label="学生人数">
                            <span>{this.state.curClass.stu_count}</span>
                        </FormItem>
                        <FormItem {...formItemLayout} label="授课教师">
                            <span>{this.state.curClass.teacher}</span>
                        </FormItem>
                        <FormItem {...formItemLayout} label="签到次数">
                            <span>{this.state.curClass.check_count}</span>
                        </FormItem>
                    </Form>
                </div>
                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}

export default Form.create()(ClassInfo)