import React from 'react'
import { Form,Input,Select,Row,Col,Button,Modal } from 'antd';
import { Link  } from 'react-router-dom';
import * as URL from '../../../component/interfaceURL'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import {AlterUserInfo} from "@component/interfaceURL";

const FormItem = Form.Item;
const Option = Select.Option;

class ChangeInformation extends React.Component{
    constructor(){
        super()
        this.state={
            pathList: ['个人中心', '修改个人信息'],
            new_nick: '',
            new_phone: '',
            new_gender: '',
            new_stu_code: '',
            new_school: '',
            new_insti: '',
            new_depart: ''
        }
    }

    //输入昵称
    handleNickChange(e) {
        this.setState({new_nick:e.target.value}, function () {
            console.log(this.state.new_nick)
        });
    }
    //输入手机号
    handlePhoneChange(e){
        this.setState({new_phone:e.target.value}, function () {
            console.log(this.state.new_phone)
        });
    }
    //选择性别
    handleGenderChange(value){
        if(value === '1'){
            //是男性
            this.setState({new_gender: "男"}, function () {
                console.log("选择 男");
            })
        }
        else{
            //是女性
            this.setState({new_gender: "女"}, function () {
                console.log("选择 女");
            })
        }
    }
    //输入学号
    handleStuCodeChange(e){
        this.setState({new_stu_code:e.target.value}, function () {
            console.log(this.state.new_stu_code)
        });
    }
    //输入学校
    handleSchoolChange(e){
        this.setState({new_school:e.target.value}, function () {
            console.log(this.state.new_school)
        });
    }
    //输入学院
    handleInstiChange(e){
        this.setState({new_insti:e.target.value}, function () {
            console.log(this.state.new_insti)
        });
    }
    //输入专业
    handleDepartChange(e){
        this.setState({new_depart:e.target.value}, function () {
            console.log(this.state.new_depart)
        });
    }

    SubmitChange(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(!err){
                var new_nick = values.Nick;
                var new_phone = values.Phone;
                var new_stu_code = values.Stu_code;
                var new_school = values.School;
                var new_insti = values.Institute;
                var new_depart = values.Depart;
                var token1 = localStorage.getItem("token");
                var uid1 = localStorage.getItem("uid");
                AlterUserInfo(token1,uid1,new_nick,new_phone,this.state.new_gender,
                    new_stu_code,new_school,new_insti,new_depart).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("success alter userinfo!");
                    }
                })
            }
        });
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
        //性别选择框
        let genders = [];
        genders.push(<Option value="1" key="1">男</Option>);
        genders.push(<Option value="2" key="2">女</Option>);



        return (
            <div className="change_information">
                <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
                <div className="change-information">
                    <Form onSubmit={this.SubmitChange.bind(this)}>
                        <FormItem {...formItemLayout} label="昵称">
                            {getFieldDecorator('Nick',{
                                rules: [{ required: true, message: '请输入昵称！' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="手机号">
                            {getFieldDecorator('Phone',{
                                rules: [{ required: true, message: '请输入手机号！' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="性别">
                            {getFieldDecorator('Gender',{

                            })(
                                <Select style={{ width: 200 }} onChange={this.handleGenderChange.bind(this)}>
                                    {genders}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="学号">
                            {getFieldDecorator('Stu_code',{
                                rules: [{ required: true, message: '请输入学号！' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="学校">
                            {getFieldDecorator('School',{
                                rules: [{ required: true, message: '请输入学校！' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="学院">
                            {getFieldDecorator('Institute',{
                                rules: [{ required: true, message: '请输入学院！' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="专业">
                            {getFieldDecorator('Depart',{
                                rules: [{ required: true, message: '请输入专业！' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <Row>
                            <Col span={12} offset={4}>
                                <Button type="primary" htmlType="submit" className="f-r">确定</Button>
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

export default Form.create()(ChangeInformation)