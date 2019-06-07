import React from 'react';
import { Form, Input, Select, Row, Col, Button, Breadcrumb,Icon } from 'antd';
import {connect} from 'react-redux'
import * as URL from '../../component/interfaceURL'
import httpServer from '../../component/httpServer'
import BreadcrumbCustom from '../../component/BreadcrumbCustom'
import { Link } from 'react-router-dom';
import {hex_md5} from '../../component/md5';
import background from '../../assets/images/background.png'

const FormItem = Form.Item;
const Option = Select.Option;

var sectionStyle = {
    width:"100%",
    height: "650px",
    backgroundImage: `url(${background})`,
    alignItems:'center',
    justifyContent:'center',
    backgroundPosition: 'absolute',
    backgroundSize: 'cover',
    bottom:"0px"
};
class ForgotPassword extends React.Component{
    constructor(){
        super();
        this.state = {
            em: '',
        };
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if (!err){
                var token = localStorage.getItem("token");
                var t_email = values.email;
                var t_vCode = values.vCode;
                var old_pwd = "";
                var new_pwd = hex_md5(values.password);
                console.log('submit!');
                //console.log(values.verifyCode);
                URL.ForgotPass(token, t_email, t_vCode, old_pwd, new_pwd).then((res)=>{
                    if(res.result_code === '200'){
                        console.log("success");
                    }
                    else{
                        console.log(res)
                    }

                })
            }
        })
    }
    onEmailChange(e){
        this.setState({em: e.target.value}, function () {
            console.log(e.target.value);
        });

    }
    getVerifyCode(){  //获取验证码
        console.log(this.state.em);
        URL.GetEmailCode(this.state.em).then((res)=>{
            console.log('success');
            console.log(res)
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        return (
            <div style={sectionStyle}>
                <Row type="flex" justify="center">
                    <Col >
                        <img className="logo" src={require("../../assets/images/logo.png")} />
                    </Col>
                </Row>
                <div className="forgot-password-content">
                    <Form onSubmit={this.handleSubmit.bind(this)}>

                        <FormItem {...formItemLayout} label="用户名">
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名！' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="新密码">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码！' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="确认密码">
                            {getFieldDecorator('password1', {
                                rules: [{ required: true, message: '请确认密码！' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: '输入不是邮箱名！',
                                }, {
                                    required: true, message: 'P请输入邮箱!',
                                }],
                            })(
                                <Input onChange={this.onEmailChange.bind(this)} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="手机号">
                            {getFieldDecorator('phone_number', {
                                rules: [{ required: true, message: '请输入手机号!' }],
                            })(
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="验证码">
                            <Row gutter={8}>
                                <Col span={12}>
                                    {getFieldDecorator('vCode',{
                                        rules: [{ required: true, message: '输入收到的验证码!' }],
                                    })(
                                        <Input span={8}/>
                                    )}
                                </Col>
                                <Col span={12}>
                                    <Button onClick={this.getVerifyCode.bind(this)}>获取验证码</Button>
                                </Col>
                            </Row>
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

export default Form.create()(ForgotPassword)