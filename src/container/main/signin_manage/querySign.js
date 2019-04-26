import React from 'react'
import { Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,message,Form, Cascader } from 'antd';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import httpServer from '../../../component/httpServer'
import * as URL from '../../../component/interfaceURL'

const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;


class QuerySignIn extends React.Component{
    constructor(){
        super();
        this.state={
            selectedRowKeys : [], //选择的行
            data : [],
            pagination : {
                pageSize : 10,
                current : 1,
                total : 0,
                defaultCurrent : 1,
            },
            visibleChangeModal : false,//修改框是否显示
            curSelectRecord : {//当前所选的记录
                key : 0,
                name : "",
                subject : "",
                studentId : "", //学号
            },
            roleSet: '', //登录角色权限
        }
    }

    componentWillMount(){
        this.setState({roleSet : localStorage.getItem("roleSet")});
    }

    //得到一页数据
    getPageDate(){

    }

    //点击修改签到状态
    changeCheck(record){

    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const columns1 = [{
            title: '课程',
            dataIndex: 'subject',
            key: 'subject',
        },{
            title: '学号',
            dataIndex:'studentId',
            key: 'studentId',
        },{
            title:'姓名',
            dataIndex:'name',
            key: 'name',
        },{
            title:'签到状态',
            dataIndex: 'check_state',
            key: 'check_state',
        },{
            title: '第几次签到',
            dataIndex: 'check_count',
            key: 'check_count',
        },{
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks',

        }];
        const columns2 = [{
            title: '课程',
            dataIndex: 'subject',
            key: 'subject',
        },{
            title:'签到状态',
            dataIndex: 'check_state',
            key: 'check_state',
        },{
            title: '第几次签到',
            dataIndex: 'check_count',
            key: 'check_count',
        },{
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks',

        }];
        let localeObj = {
            emptyText: '暂无数据'
        };

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
            <div className="query_sign_in">
                <BreadcrumbCustom pathList={['签到管理','查询签到信息']}></BreadcrumbCustom>
                <div className="query-signin-content">
                    {this.state.roleSet == '1' ?<div className="m-t-20">
                        <Table
                            columns={columns1}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            locale={localeObj}

                        />
                    </div>:
                    <div className="m-t-20">
                        <Table
                            columns={columns2}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            locale={localeObj}

                        />
                    </div>}
                </div>
            </div>
        )
    }
}

export default Form.create()(QuerySignIn)