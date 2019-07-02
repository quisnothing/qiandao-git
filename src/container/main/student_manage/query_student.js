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
            currentCourseId : '',
            selectedRowKeys: [],
            selectedRows: [],
            data: [{
                key: '',
                id:"",
                uid:"",
                stu_code:"",
                name:"",
                gender:"",
                school:"",
                department:"",
                profession:"",
                phone:"",
                lack_count:""
            }],  // student list
            pagination: {
                pageSize:10,
                current:1,
                total:0,
                defaultCurrent:1,
            },
            visibleChangeModal: false, //修改框是否显示
            curSelectClass:{ //当前选中的学生列
                key: 0,
                id: '',
                name: "",
                profession: "",
                stu_code: '',
            },
            classInfo: [], //班级/专业信息
            college: '',
            profess: '',
        };
        this.searchKey = "1"; //默认按照班级搜索，1班级，2学科，3状态
        this.turnStatus = "NORMAL"; //NORMAL正常翻页
        this.searchContent = "" ;//搜索内容
    }
    componentWillMount(){
        let c_id = '';
        if(this.props.location.query !== undefined){
            let data = this.props.location.query;
            console.log(data);
            this.setState({currentCourseId: data.a});
            c_id = data.a;
            localStorage.setItem("currentCourseId",data.id);
        }
        else{
            c_id = localStorage.getItem("currentCourseId");
        }

        //通过传递过来的course_id获取对应的学生列表
        let token1 = localStorage.getItem("token");
        URL.GetStuList(token1, c_id).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success get student list!");
                const data = [];
                for (let i = 0; i < res.data.data.length; i++) {

                    data.push({
                        key: res.data.data[i].uid,
                        stu_code:res.data.data[i].stu_code,
                        name:res.data.data[i].name,
                        gender:res.data.data[i].gender,
                        school:res.data.data[i].school,
                        department:res.data.data[i].department,
                        profession:res.data.data[i].profession,
                        phone:res.data.data[i].phone,
                        lack_count:res.data.data[i].lack_count
                    });
                }
                this.setState({data: data});
            }
            else if(res.data.result_code === '206'){
                console.log("token time out!");
                message.error("token time out!");
            }else{
                console.log(res.data);
            }
        })
    }

    //选择某一行
    onSelectChange(selectedRowKeys, selectedRows){
        console.log('selectedRowKeys changed: ', selectedRows);
        this.setState({ selectedRowKeys: selectedRowKeys, selectedRows:selectedRows });
    }

    //刷新列表
    SyncOption(){
        let token1 = localStorage.getItem("token");
        URL.GetStuList(token1, this.state.currentCourseId).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("success get student list!");
                const data = [];
                console.log(res.data)
                for (let i = 0; i < res.data.data.length; i++) {

                    data.push({
                        key: res.data.data[i].id,
                        id:res.data.data[i].id,
                        uid:res.data.data[i].uid,
                        stu_code:res.data.data[i].stu_code,
                        name:res.data.data[i].name,
                        gender:res.data.data[i].gender,
                        school:res.data.data[i].school,
                        department:res.data.data[i].department,
                        profession:res.data.data[i].profession,
                        phone:res.data.data[i].phone,
                        lack_count:res.data.data[i].lack_count
                    });
                }
                //console.log(data)
                this.setState({data: data});
            }
            else if(res.data.result_code === '206'){
                console.log("token time out!");
                message.error("token time out!");
            }else{
                console.log(res.data);
            }
        })
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
                    key: res.data.data[i].uid,
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

    handleCollegeChange(value){ //级联菜单的改变
        console.log(value);

    }

    //点击搜索
    SearchContent(value) {
        if(value === ""){
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
        //this.setState({visibleChangeModal:false});
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                const role = localStorage.getItem("type");
                if(role !== 1){ //只有管理员才能增、删、改
                    message.error("权限不足！");
                    return;
                }
                let token1 = localStorage.getItem("token");
                URL.AlterStuInfo(token1, this.state.curSelectClass.id, values.lack_count).then((res)=>{
                    if(res.data.result_code === '200'){
                        console.log("alter success!");
                        this.setState({visibleChangeModal:false});
                    }

                })
            }
        });
    }

    //打开修改学生列表界面
    ChangeStuList(record){
        let data = {key: 0};
        data["id"] = record.id;
        data["stu_code"] = record.stu_code;
        data["name"] = record.name;
        data["profession"] = record.profession;
        this.setState({curSelectClass:data}, function () {
            this.setState({visibleChangeModal: true});
        })
    }
    //删除学生列表
    DelStuList(){
        const role = localStorage.getItem("type");
        if(role !== 1){ //只有管理员才能增、删、改
            message.error("权限不足！");
            return;
        }
        let token1 = localStorage.getItem("token");
        console.log(token1);
        URL.DelStuinfo(token1, this.state.selectedRows[0].key, this.state.currentCourseId).then((res)=>{
            if(res.data.result_code === '200'){
                console.log("alter success!");

            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '编号',
                dataIndex: 'key',
                key: 'key'
            },
            {
                title: '学号',
                dataIndex: 'stu_code',
                key: 'stu_code',
                sorter: (a,b) => a.stu_code.length-b.stu_code.length
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                sorter: (a,b) => a.name.length-b.name.length
            },
            {
                title: '学校',
                dataIndex: 'school',
                key: 'school',
            },
            {
                title: '学院',
                dataIndex: 'department',
                key: 'department',
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
                        <Button type="danger" size="small" onClick={this.DelStuList.bind(this)}>删除</Button>
                        <Divider type="vertical"/>
                        <Button size="small" onClick={this.ChangeStuList.bind(this, record)}>修改</Button>
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
                            {/*<Button type="primary" className="f-l">查询</Button>*/}
                            {/*<Cascader options={options} onChange={this.handleCollegeChange.bind(this)}/>*/}
                            <ButtonGroup className="f-r m-r-20">
                                <Button type="primary" icon="plus" />
                                <Button type="primary" icon="sync" onClick={this.SyncOption.bind(this)}/>
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
                            rowSelection={rowSelection}
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
                            <FormItem {...formItemLayout} label="记录编号">
                                <span>{this.state.curSelectClass.id}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="学号">
                                <span>{this.state.curSelectClass.stu_code}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="姓名">
                                <span>{this.state.curSelectClass.name}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="专业">
                                <span>{this.state.curSelectClass.profession}</span>
                            </FormItem>
                            <FormItem {...formItemLayout} label="缺勤次数">
                                {getFieldDecorator('lack_count', {

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