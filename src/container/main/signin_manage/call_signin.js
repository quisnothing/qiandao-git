import React from 'react'
import { Form, Input, Select, Row, Col, Button, Breadcrumb, DatePicker } from 'antd';
import {connect} from 'react-redux'
import { Link  } from 'react-router-dom';
import * as URL from '../../../component/interfaceURL'
import httpServer from '../../../component/httpServer'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;


class CallSignIn extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }

    //提交
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(!err){

            }
        });
    }

    //第几次签到选择
    handleChange(value){
        console.log(`selected ${value}`);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
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
            <div className="call_sign_in">
                <BreadcrumbCustom pathList={['签到管理', '发起签到']}></BreadcrumbCustom>
                <div className="call-signin-content">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem {...formItemLayout} label="课程">
                            {getFieldDecorator('subject',{
                                rules: [{ required: true, message: '请输入课程!' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="任课教师">
                            {getFieldDecorator('teacher')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="签到时间">
                            {getFieldDecorator('range-time-picker', {
                                rules: [{ type: 'array', required: true, message: '请选择时间!' }],
                            })(
                                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="签到地点">
                            {getFieldDecorator('signin-place',{
                                rules: [{ required: true, message: '请输入签到地点!' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="第几次签到">
                            {getFieldDecorator('signin-count')(
                                <Select className="f-r m-r-20" defaultValue="1" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                </Select>
                            )}
                        </FormItem>
                        <Row>
                            <Col span={12} offset={4}>
                                <Button type="primary" htmlType="submit" className="f-r">确定</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>

            </div>
        )
    }
}

export default connect()(Form.create()(CallSignIn))