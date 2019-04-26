import React from 'react'
import { Form,Input,Select,Row,Col,Button,Modal } from 'antd';
import { Link  } from 'react-router-dom';
import * as URL from '../../../component/interfaceURL'
import httpServer from '../../../component/httpServer'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'

const FormItem = Form.Item;
const Option = Select.Option;

class ChangePassword extends React.Component{
    constructor(){
        super();
        this.state={
            pathList: ['个人中心', '修改密码'],
        }

    }

    //选择班级
    handleChange(value) {
        console.log(`selected ${value}`);
    }

    submitChange(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(!err){

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

        return (
            <div className="change_password">
                <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
                <div className="change-password-content">
                    <Form onSubmit={this.submitChange.bind(this)}>
                        <FormItem {...formItemLayout} label="原密码">
                            {getFieldDecorator('oldPassword',{
                                rules: [{ required: true, message: '请输入原密码！' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="新密码">
                            {getFieldDecorator('Password1',{
                                rules: [{ required: true, message: '请输入新密码！' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="确认密码">
                            {getFieldDecorator('Password2',{
                                rules: [{ required: true, message: '请确认密码！' }],
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

export default Form.create()(ChangePassword)