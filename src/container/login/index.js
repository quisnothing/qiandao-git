import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux'
import {Link,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd'
import * as userinfoActions from '../../actions/userinfo'
import { axiosLogin } from './axios/index'
import httpServer from '../../component/httpServer'
import * as URL from '../../component/interfaceURL'
import {hex_md5} from "@component/md5";

const FormItem = Form.Item;

class Login extends React.Component{

    constructor(){
        super();
        this.state = {
            loginTip: ''
        };
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(!err){
                var u_name = values.userName;
                var u_pass = hex_md5(values.password);
                URL.UserLogin(u_name, u_pass).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("success register!");
                        //message.success('登录成功!');
                        this.props.userinfoActions.login({
                            userName: values.userName
                        });
                        //本地存储用户名
                        localStorage.setItem("userName",values.userName);
                        localStorage.setItem("uid",res.data.data.uid);
                        localStorage.setItem("token", res.data.data.token);
                        localStorage.setItem("type", res.data.data.type);
                        //跳转主页
                        this.props.history.push("/main/homepage");//react-router 4.0 写法
                    }
                    else{
                        message.error("登录失败！");
                    }
                })
                // httpServer({
                //     url:URL.login
                // },{
                //     username : values.userName,
                //     password : values.password
                // }).then((res)=>{
                //     if(res.data.result_code === 200) {//登录成功
                //         console.log("1");
                //         //发送Action  向Store 写入用户名和密码
                //         this.props.userinfoActions.login({
                //             userName: values.userName
                //         });
                //         //本地存储用户名
                //         localStorage.setItem("userName",values.userName);
                //         localStorage.setItem("uid",res.data.data.uid);
                //         localStorage.setItem("token", res.data.data.token);
                //         localStorage.setItem("type", res.data.data.type);
                //         //跳转主页
                //         this.props.history.push("/main/homepage");//react-router 4.0 写法
                //     }
                //     else if(res.respCode === "0") {//登录失败
                //         this.setState({loginTip : "登录名或密码错误"})
                //     }
                //     else if(res.respCode === "-1"){ //系统错误
                //         this.setState({loginTip : "系统出错了，请稍等~"})
                //     }
                // });
            }
        });
    }

    gotoForgot(){
        this.props.history.push("/forgotpassword");
    }
    gotoRegister(){
        this.props.history.push("/register");
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-content-wrap">
                    <div className="login-content">
                        <img className="logo" src={require("../../assets/images/logo.png")} />
                        <div className="login-from">
                            <div className="login-tip">{this.state.loginTip}</div>
                            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入用户名！' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码！' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>记住我</Checkbox>
                                        )
                                    }
                                    <a className="login-form-forgot" onClick={this.gotoForgot.bind(this)}>忘记密码</a>

                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        登录
                                    </Button>
                                    或者<a onClick={this.gotoRegister.bind(this)}>立即注册</a>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//传递state给子组件
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

//组合userinfoActions和dispatch的对象传递给子组件
//在子组件中，调用userinfoActions.action1,相当于实现了store.dispatch(action1)
//于是我们就实现了在没有store和dispatch组件中，如何调用dispatch(action)
function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(Login))
