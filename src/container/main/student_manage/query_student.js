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
const ButtonGroup = Button.Group;

let CollegeData = ['数计学院','经管学院', '建筑学院', '电气学院', '土木学院', '物信学院', '外国语学院'];
const options = [{
    value: '数计学院',
    label: '数计学院',
    children:[{
        value: '全部',
        label: '全部',
    },{
        value: '计算机系统结构',
        label: '计算机系统结构',
    },{
        value: '计算机技术',
        label: '计算机技术',
    }],
},{
    value: '经管学院',
    label: '经管学院',
    children: [{
        value: '全部',
        label: '全部',
    },{
        value: '金融信息',
        label: '金融信息'
    }]
}];

class QueryStudent extends React.Component{
    constructor(){
        super();
        this.state={
            selectedRowKeys: [],
            data: [],
            pagination: {
                pageSize:10,
                current:1,
                total:0,
                defaultCurrent:1,
            },
            visibleChangeModal: false, //修改框是否显示
            curSelectClass:{ //当前选中的学生
                key: 0,
                name: "",
                profession: "",
                studentId: 1,
            },
            classInfo: [], //班级/专业信息
            college: '',
            profess: '',
        };
        this.searchKey = "1"; //默认按照班级搜索，1班级，2学科，3状态
        this.turnStatus = "NORMAL"; //NORMAL正常翻页
        this.searchContent = "" ;//搜索内容
    }

    //选择某一行
    onSelectChange(selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    //得到搜索的数据
    getSearchData(){
        httpServer({
            url: URL.search_course,
            method: 'get'
        },{
            content: this.searchContent,
        }).then((res)=>{
            const data = [];
            for(let i = 0; i<res.data.data.length;i++){
                data.push({
                    stu_code:res.data.data[i].name,
                    name:res.data.data[i].name,
                    gender:res.data.data[i].gender,
                    school:res.data.data[i].school,
                    department:res.data.data[i].department,
                    profession:res.data.data[i].profession,
                    phone:res.data.data[i].phone,
                    lack_count:res.data.data[i].lack_count
                });
            }
            this.state.pagination.total = res.data.data.length;
            this.setState({
                data:data,
                pagination: this.state.pagination
            })
        })
    }

    //搜索类型选择
    handleChange(value){
        this.searchKey = value;
        console.log(value);
    }

    handleCollegeChange(value){
        console.log(value);

    }

    //点击搜索
    searchContent(value) {
        if(value == ""){
            Modal.error({
                content: "搜索内容不能为空！",
                okText: "确定"
            });
            return;
        }
        this.turnStatus = "SEARCH";
        this.state.pagination.current = 1;//当前页置为第一页
        this.setState({pagination : this.state.pagination});
        this.searchContent = value;
        this.getSearchData();
    }

    //取消修改
    changeCancel(){
        this.setState({visibleChangeModal:false})
    }

    //确认修改
    changeOK(){
        this.setState({visibleChangeModal:false});
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){

            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '学号',
                dataIndex: 'studentId',
                key: 'studentId',
                sorter: (a,b) => a.studentId.length-b.studentId.length
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                sorter: (a,b) => a.name.length-b.name.length
            },
            {
                title: '专业',
                dataIndex: 'profession',
                key: 'profession',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record)=>(
                    <span>
                        <Button type="danger" size="small">删除</Button>
                        <Divider type="vertical"/>
                        <Button size="small">修改</Button>
                    </span>
                )
            }
        ];
        //行选择
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };

        let localObj = {
            emptyText: '暂无数据',
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
        //专业（班级）信息
        let classArr = [];


        return (
            <div>
                <BreadcrumbCustom pathList={['学生管理','查询学生']}></BreadcrumbCustom>
                <div className="query-student-content">
                    <Row>
                        <Col span={24}>
                            <Button type="primary" className="f-l">查询</Button>
                            <Cascader options={options} onChange={this.handleCollegeChange.bind(this)}/>
                            <ButtonGroup className="f-r m-r-20">
                                <Button type="primary" icon="plus" />
                                <Button type="primary" icon="sync" />
                            </ButtonGroup>
                        </Col>
                        {/*<Col span={24}>*/}
                            {/*<Search*/}
                                {/*className="f-r"*/}
                                {/*placeholder="请输入关键字"*/}
                                {/*onSearch={this.searchClass.bind(this)}*/}
                                {/*enterButton*/}
                                {/*style={{width: 200}}*/}
                            {/*/>*/}
                            {/*<Select className="f-r m-r-20" defaultValue="1" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>*/}
                                {/*<Option value="1">姓名</Option>*/}
                                {/*<Option value="2">学号</Option>*/}
                                {/*<Option value="3">班级</Option>*/}
                            {/*</Select>*/}
                            {/*<Button type="primary" className="f-l">所有学生</Button>*/}
                        {/*</Col>*/}
                    </Row>
                    <div className="m-t-20">
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            locale={localObj}
                        />
                    </div>
                    <Modal
                        title="修改学生信息"
                        visible={this.state.visibleChangeModal}
                        footer={null}
                        onCancel={this.changeCancel.bind(this)}
                    >
                        <Form onSubmit={this.changeOK.bind(this)}>
                            <FormItem {...formItemLayout} label="学号">
                                <span>{this.state.curSelectClass.studentId}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="姓名">
                                {getFieldDecorator('name', {
                                    initialValue: this.state.curSelectClass.name
                                }) (
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="专业">
                                {getFieldDecorator('class', {
                                    initialValue: this.state.curSelectClass.class
                                }) (
                                    <Select style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
                                        {classArr}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="登录密码">
                                {getFieldDecorator('password', {

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
                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        classinfo: state.classinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(QueryStudent))