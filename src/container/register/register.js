import React from 'react'
import { Card,Icon,Layout,Row,Col,Tree,Form,Input,Button, Steps, message, Select } from 'antd';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import BreadcrumbCustom from '../../component/BreadcrumbCustom'
import * as URL from '../../component/interfaceURL'
import {hex_md5} from "@component/md5";
import './index.css'
const FormItem = Form.Item;
const { TreeNode } = Tree;
const Step = Steps.Step;
const Option = Select.Option;

class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            current: 0,

            email: '',
            email_code: '',
            phone: '',
            password: '',
            type: '',
            name: '',
            stu_code: '',
            school: '',
            department: '',
            profession: '',

            ref_em:'',
            ref_em_c: '',
            ref_p: '',
            ref_pass: '',
            ref_ty: '',
            ref_nam: '',
            ref_sc: '',
            ref_sl: '',
            ref_de: '',
            ref_prs: ''
        };
        this.searchKey = '1';
    }
    //验证是否是合格的手机号
    onPhoneRq(rule, value, callback){
        if(/^\d*$/g.test(value)){
            if(value.length != 11){
                callback('请输入11位电话号码!');
            }
        }else{
            callback('请输入正确的电话号码!');
        }
    }
    handleEmailChange(e){
        this.setState({email: e.target.value}, function () {
            console.log(this.state.email)
        });
    }
    handleEmailCodeChange(e){
        this.setState({email_code: e.target.value}, function () {
            console.log(this.state.email_code)
        });
    }
    handlePhoneChange(e){
        this.setState({phone: e.target.value}, function () {
            console.log(this.state.phone)
        });
    }
    handlePassChange(e){
        this.setState({password: e.target.value}, function () {
            console.log(this.state.password)
        });
    }
    handleNameChange(e){
        this.setState({name: e.target.value}, function () {
            console.log(this.state.name)
        });
    }
    handleStuCodeChange(e){
        this.setState({stu_code: e.target.value}, function () {
            console.log(this.state.stu_code)
        });
    }
    handleScChange(e){
        this.setState({school: e.target.value}, function () {
            console.log(this.state.school)
        });
    }
    handleDpChange(e){
        this.setState({department: e.target.value}, function () {
            console.log(this.state.department)
        });
    }
    handlePrfChange(e){
        this.setState({profession: e.target.value}, function () {
            console.log(this.state.profession)
        });
    }
    goNext(){
        //console.log(this.state.ref_em);
        if(this.state.current === 0){ //需要验证验证码是否正确
            // this.setState({email: this.state.ref_em.props.value,
            //     email_code:this.state.ref_em_c.props.value}, function () {
            //     console.log(this.state.email);
            //     console.log(this.state.email_code);
            //
            // });
            console.log(this.state.email);
            console.log(this.state.email_code);
        }
        else if(this.state.current === 1){
            console.log(this.state.password);
            console.log(this.state.type);
            // this.setState({phone: this.state.ref_p.props.value,
            //     password: this.state.ref_pass.props.value
            //     }, function () {
            //     console.log(this.state.type);
            // })
        }
        const current1 = this.state.current + 1;
        this.setState({current: current1});
    }

    goPrev(){
        const current1 = this.state.current - 1;
        this.setState({current: current1});

    }

    finish(){ //完成注册
        //首先保存表单信息
        // this.setState({name: this.state.ref_nam.props.value,
        //     stu_code: this.state.ref_sc.props.value,
        //     school: this.state.ref_sl.props.value,
        //     department: this.state.ref_de.props.value,
        //     profession: this.state.ref_prs.props.value}, function () {
        //     console.log(this.state);
        //     //然后发送注册信息
        //     var origin_pass = this.state.password;
        //     var md5_pass = hex_md5(origin_pass);
        //
        // })
        console.log(this.state);
        URL.UserRegister(this.state.email, this.state.email_code, this.state.phone,
            hex_md5(this.state.password), this.state.type, this.state.name, this.state.stu_code,
            this.state.school, this.state.department, this.state.profession).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success register!");
                //message.success('Processing complete!')
            }
            else{
                console.log(res.data.result_desc);
            }
        })
    }

    handleSubmit1(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if (!err){
                console.log("success");
            }
        })
    }
    onGetCode(){ //从服务器获取邮箱验证码
        console.log(this.state.ref_em.props.value);
        URL.GetEmailCode(this.state.ref_em.props.value).then((res)=>{
            console.log("success");
            //console.log(res)
        });
        //console.log(data);

    }

    handleChange(value){  //选择用户类型,传入的是value
        this.setState({type: value});
        console.log(value);
    }


    render(){
        const { getFieldDecorator } = this.props.form;
        const {current} = this.state;
        //表单布局
        const formItemLayout = {
            labelCol: {
                xs: {span:24},
                sm:{span:8},
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:8},
            },
        };

        const steps = [{
            title: '第一步',
            content: <div><Form onSubmit = {this.handleSubmit1.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '请输入邮箱!' }]
                    })(
                        <Input placeholder="请输入邮箱"
                               ref={name=>this.state.ref_em=name}
                               onChange={this.handleEmailChange.bind(this)}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱验证码"
                >
                    {getFieldDecorator('emailCode',{
                        rules:[
                            {required:true,message:'必填项不能为空'}
                        ]
                    })(
                        <div className="yzm-box">
                            <Row gutter={16}>
                                <Col span={10}><Input  placeholder="请输入验证码"
                                                       ref={name=>this.state.ref_em_c=name}
                                                       onChange={this.handleEmailCodeChange.bind(this)}
                                               />
                                </Col>
                                <Col span={6}> <Button  className="btnStore" onClick={this.onGetCode.bind(this)}>获取验证码</Button></Col>
                            </Row>
                        </div>
                    )}
                </FormItem>
            </Form>
            </div>,
        }, {
            title: '第二步',
            content: <div>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="手机号"
                    >
                        {getFieldDecorator('phone',{
                            rules:[
                                {required:true,message:'必填项不能为空'},
                                {validator: this.onPhoneRq}
                            ]
                        })(
                            <Input placeholder="请输入手机号"
                                   ref={name=>this.state.ref_p=name}
                                   onChange={this.handlePhoneChange.bind(this)}
                            />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   type="password" placeholder="密码"
                                   ref={name=>this.state.ref_pass=name}
                                   onChange={this.handlePassChange.bind(this)}
                            />
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
                </Form>
            </div>,
        }, {
            title: '第三步',
            content: <div>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                        hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入姓名!' }]
                        })(
                            <Input placeholder="请输入姓名"
                                   ref={name=>this.state.ref_nam=name}
                                   onChange={this.handleNameChange.bind(this)}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="学号"
                        hasFeedback>
                        {getFieldDecorator('stu_code', {
                            rules: [{ message: '请输入学号!' }]
                        })(
                            <Input placeholder="请输入学号"
                                   ref={name=>this.state.ref_sc=name}
                                   onChange={this.handleStuCodeChange.bind(this)}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="学校"
                        hasFeedback>
                        {getFieldDecorator('school', {
                            rules: [{ required: true, message: '请输入学校!' }]
                        })(
                            <Input placeholder="请输入学校"
                                   ref={name=>this.state.ref_sl=name}
                                   onChange={this.handleScChange.bind(this)}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="学院"
                        hasFeedback>
                        {getFieldDecorator('department')(
                            <Input placeholder="请输入学院"
                                   ref={name=>this.state.ref_de=name}
                                   onChange={this.handleDpChange.bind(this)}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="专业"
                        hasFeedback>
                        {getFieldDecorator('profession')(
                            <Input placeholder="请输入专业"
                                   ref={name=>this.state.ref_prs=name}
                                   onChange={this.handlePrfChange.bind(this)}
                            />
                        )}
                    </FormItem>
                </Form>
            </div>,
        }];

        return(
            <div>
                <div align="center">
                    <img className="logo" id="logo" src={require("../../assets/images/logo.png")} />
                </div>

                <div>
                    <div style={{margin:'40px'}}>
                        <Steps current={current}>
                            {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                    </div>

                    <div id="steps-content">{steps[current].content}</div>
                    <div id="steps-action">
                        {
                            current < steps.length - 1
                            && <Button type="primary" onClick={() => this.goNext()}>下一步</Button>
                        }
                        {
                            current === steps.length - 1
                            && <Button type="primary" onClick={() => this.finish()}>完成</Button>
                        }
                        {
                            current > 0
                            && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.goPrev()}>
                                    上一步
                                </Button>
                            )
                        }
                    </div>
                </div>
                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}

export default Form.create()(Register)