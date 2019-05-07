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
            selectedRows: [],
            data : [{
                key: "123421",
                id:"123421",
                uid:"12413",
                stu_code:"1241241",
                name:"张三",
                gender:"男",
                school:"福大",
                department:"数计学院",
                profession:"计算机专业",
                phone:"",
                count:"3",
                check_state:"1",
                check_time:"20124154",
                check_location:"12542356",
                remarks:"无",
                distance:"11"
            }],
            pagination : {
                pageSize : 10,
                current : 1,
                total : 0,
                defaultCurrent : 1,
            },
            visibleChangeModal : false,//修改框是否显示
            curSelectRecord : {//当前所选的记录
                key : 0,
                id : "",
                name : "",
                stu_code : "", //学号
                remarks: "",
                distance: ""
            },
            roleSet: '', //登录角色权限
        }
    }

    componentWillMount(){
        this.setState({roleSet : localStorage.getItem("roleSet")});
        //需要根据传过来的course_id获得签到列表
        let data = this.props.location.query;
        let token1 = localStorage.getItem("token");
        // URL.GetCheckList(token1, data.id).then((res)=>{
        //     if(res.data.result_code === '200'){
        //         console.log("success get signIn list!");
        //         const data = [];
        //         for (let i = 0; i < res.data.data.length; i++) {
        //
        //             data.push({
        //                 key: res.data.data[i].uid,
        //                 studentId: res.data.data[i].stu_code,
        //                 name: res.data.data[i].name,
        //                 check_state: res.data.data[i].check_state,
        //                 check_count: res.data.data[i].count,
        //                 remarks: res.data.data[i].remarks
        //             });
        //         }
        //         this.setState({data: data});
        //     }
        //     else if(res.data.result_code === '206'){
        //         console.log("token time out!");
        //         message.error("token time out!");
        //     }else{
        //         console.log(res.data);
        //     }
        // })
    }

    //得到一页数据
    getPageDate(){

    }
    onSelectChange(selectedRowKeys, selectedRows){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
    }

    //打开修改签到列表界面
    ChangeSignList(record){
        let data = {key: 0};
        data["id"] = this.state.selectedRowKeys[0];
        data["stu_code"] = record.stu_code;
        data["name"] = record.name;
        data["remarks"] = record.remarks;
        this.setState({curSelectRecord:data}, function () {
            this.setState({visibleChangeModal: true});
        })
    }
    //取消修改
    changeCancel(){
        this.setState({visibleChangeModal:false})
    }
    changeOK(){
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                let token1 = localStorage.getItem("token");
                URL.AlterSignList(token1, this.state.curSelectRecord.id, values.remarks,
                    this.state.selectedRows[0].distance).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("alter success!");
                        this.setState({visibleChangeModal:false});
                    }

                })
            }
        });
    }

    deleteOk(){
        let token1 = localStorage.getItem("token");
        URL.DelSignList(token1, this.state.selectedRows.id).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("alter success!");
                //this.setState({visibleChangeModal:false});
            }
        })
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const columns1 = [{
            title: '学号',
            dataIndex:'stu_code',
            key: 'stu_code',
        },{
            title:'姓名',
            dataIndex:'name',
            key: 'name',
        },{
            title:'学院',
            dataIndex:'department',
            key: 'department',
        },{
            title:'专业',
            dataIndex:'profession',
            key: 'profession',
        },{
            title:'签到状态',
            dataIndex: 'check_state',
            key: 'check_state',
        },{
            title: '第几次签到',
            dataIndex: 'count',
            key: 'count',
        },{
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks',

        },{
            title: '操作',
            key: 'action',
            render: (text, record)=>(
                <span>
                        <Button type="danger" size="small" onClick={this.deleteOk.bind(this)}>删除</Button>
                        <Divider type="vertical"/>
                        <Button size="small" onClick={this.ChangeSignList.bind(this, record)}>修改</Button>
                    </span>
            )
        }];
        const columns2 = [{
            title: '学号',
            dataIndex:'stu_code',
            key: 'stu_code',
        },{
            title:'姓名',
            dataIndex:'name',
            key: 'name',
        },{
            title:'学院',
            dataIndex:'department',
            key: 'department',
        },{
            title:'专业',
            dataIndex:'profession',
            key: 'profession',
        },{
            title:'签到状态',
            dataIndex: 'check_state',
            key: 'check_state',
        },{
            title: '第几次签到',
            dataIndex: 'count',
            key: 'count',
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
        //行选择
        const rowSelection = {
            selectedRowKeys : this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };

        return (
            <div className="query_sign_in">
                <BreadcrumbCustom pathList={['签到管理','查询签到信息']}></BreadcrumbCustom>
                <div className="query-signin-content">
                    {this.state.roleSet != '3' ?<div className="m-t-20">
                        <Table
                            rowSelection={rowSelection}
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
                    <Modal
                        title="修改签到信息"
                        visible={this.state.visibleChangeModal}
                        footer={null}
                        onCancel={this.changeCancel.bind(this)}
                    >
                        <Form onSubmit={this.changeOK.bind(this)}>
                            <FormItem {...formItemLayout} label="记录编号">
                                <span>{this.state.curSelectRecord.id}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="学号">
                                <span>{this.state.curSelectRecord.stu_code}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="姓名">
                                <span>{this.state.curSelectRecord.name}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="备注">
                                {getFieldDecorator('remarks', {

                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <Row>
                                <Col span={24}>
                                    <Button type="primary" className="f-r" htmlType="submit">
                                        确定
                                    </Button>
                                    <Button type="primary" className="f-r m-r-20" onClick={this.changeCancel.bind(this)}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </Form>

                    </Modal>
                </div>
            </div>
        )
    }
}

export default Form.create()(QuerySignIn)