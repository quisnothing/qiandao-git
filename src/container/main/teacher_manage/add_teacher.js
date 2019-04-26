import React from 'react'
import { Form,Input,Select,Row,Col,Button } from 'antd';
import { Link  } from 'react-router-dom';
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import httpServer from '../../../component/httpServer'
import * as URL from '../../../component/interfaceURL'
const FormItem = Form.Item;
const Option = Select.Option;

class AddTeacher extends React.Component{
    constructor(){
        super();
        this.state={
            pathList: ['教师管理', '添加教师'],
            managerId : 0,
        }
    }

    //选择班级
    handleChange(value){
        console.log(`selected ${value}`);
    }

    //获取工号
    getManagerId(){

    }

    //提交
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if(!err){

            }
        });
    }

    componentWillMount(){
        this.getManagerId();
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
            <div className="addTeacher">
                <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom>
                <div className="add-student-content">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem {...formItemLayout} label="工号">
                            <span>{this.state.managerId}</span>
                        </FormItem>
                        <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator('name')(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="角色">
                            {getFieldDecorator('roleId')(
                                <Select style={{width: '100%'}}>
                                    <Option value={2}>教学</Option>
                                    <Option value={3}>教务</Option>
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

export default Form.create()(AddTeacher)