import React from 'react'
import { Menu} from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import {Route, Link, Switch} from 'react-router-dom'
import httpServer from '../../component/httpServer'
import * as URL from '../../component/interfaceURL'
import Homepage from './homepage/index.js'
import HeaderBar from './header_bar'
import AddStudent from './student_manage/add_student'
import QueryStudent from './student_manage/query_student'
import AddTeacher from './teacher_manage/add_teacher'
import QueryTeacher from './teacher_manage/query_teacher'
import CallSignIn from './signin_manage/call_signin'
import QuerySignIn from './signin_manage/querySign'
import AddClass from './class_manage/add_class'
import QueryClass from './class_manage/query_class'
import ClassInfo from './class_manage/class_info'
import ChangePassword from './personal_center/change_password'
import ChangeInformation from './personal_center/change_informatioon'
import DicList from './dic_manage/dic_list'
import UserList from './dic_manage/user_list'
import DictType from './dic_manage/dict_type'
import * as subjectinfoActions from '../../actions/subjectinfo'
import * as classinfoActions from '../../actions/classinfo'
import './index.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Main extends React.Component{
    constructor(){
        super();
        this.state = {
            defaultOpenKeys: [], //菜单默认打开项
            defaultSelectedKeys: [], //菜单默认选择项
            openKeys: [], //菜单打开项
            subjectArr: [], //科目数组
            roleSet: '',
        };
        this.rootSubmenuKeys = ['class_manage','student_manage','teacher_manage','dic_manage'];
    }

    //根据路由判断，用户选择了菜单中的哪一项
    WhoIsChecked(){
        if(this.props.location.pathname.indexOf('/main/dic_manage') != -1){
            this.setState({defaultOpenKeys:['dic_manage']});
            this.setState({openKeys:['dic_manage']});
            let arr = this.props.location.pathname.split('/');
            let str = arr[arr.length-1];
            this.setState({defaultSelectedKeys : [str]})
        }
        else if (this.props.location.pathname.indexOf('/main/student_manage') != -1){ //学生
            this.setState({defaultOpenKeys : ['student_manage']});
            this.setState({openKeys : ['student_manage']});
            let arr = this.props.location.pathname.split('/');
            let str = arr[arr.length-1];
            this.setState({defaultSelectedKeys : [str]});
        }
        else if(this.props.location.pathname.indexOf('/main/teacher_manage') != -1) {//教师管理
            this.setState({defaultOpenKeys : ['teacher_manage']});
            this.setState({openKeys : ['teacher_manage']});
            let arr = this.props.location.pathname.split('/');
            let str = arr[arr.length-1];
            this.setState({defaultSelectedKeys : [str]});
        }
        else if(this.props.location.pathname.indexOf('/main/class_manage') != -1) {//课程管理
            this.setState({defaultOpenKeys : ['class_manage']});
            this.setState({openKeys : ['class_manage']});
            let arr = this.props.location.pathname.split('/');
            let str = arr[arr.length-1];
            this.setState({defaultSelectedKeys : [str]});
        }
        else if(this.props.location.pathname.indexOf('/main/personal_center') != -1) {//个人中心
            this.setState({defaultOpenKeys : ['personal_center']});
            this.setState({openKeys : ['personal_center']});
            let arr = this.props.location.pathname.split('/');
            let str = arr[arr.length-1];
            this.setState({defaultSelectedKeys : [str]});
        }
    }

    componentWillMount(){
        //判断用户是否已经登录
        if(!localStorage.getItem("userName")) {
            this.props.history.push('/login');//跳转至登录页
        }


        this.setState({roleSet : localStorage.getItem("type")});
        this.WhoIsChecked();
    }

    onOpenChange(openKeys){
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render(){
        return (
           <div>
               <div id="leftMenu">
                   <img className="logo" src={require("@assets/images/logo.png")}/>
                   <div>
                       <Menu mode="inline" defaultOpenKeys={this.state.defaultOpenKeys} defaultSelectedKeys={this.state.defaultSelectedKeys}
                             openKeys={this.state.openKeys} onOpenChange={this.onOpenChange.bind(this)} theme="dark">
                           <SubMenu key="class_manage" title={<span><Icon type="layout" /><span>课程管理</span></span>}>
                               <Menu.Item key="add_class"><Link to="/main/class_manage/add_class">课程信息</Link></Menu.Item>
                               {/*<Menu.Item key="query_class"><Link to="/main/class_manage/query_class">签到信息</Link></Menu.Item>*/}
                               {/*<Menu.Item key="query_student"><Link to="/main/student_manage/query_student">学生信息</Link></Menu.Item>*/}
                           </SubMenu>
                           {/*<SubMenu key="signin_manage" title={<span><Icon type="bulb" /><span>签到管理</span></span>}>*/}
                               {/*<Menu.Item key="call_signin"><Link to="/main/signin_manage/call_signin">发起签到</Link></Menu.Item>*/}
                               {/*<Menu.Item key="query_sign"><Link to="/main/signin_manage/querySign">签到管理</Link></Menu.Item>*/}
                           {/*</SubMenu>*/}
                           {
                               this.state.roleSet == 1 ? <SubMenu key="student_manage" title={<span><Icon type="usergroup-add" /><span>学生管理</span></span>}>
                                   <Menu.Item key="add_student"><Link to="/main/student_manage/add_student">添加学生到课程</Link></Menu.Item>
                                   {/*<Menu.Item key="query_student"><Link to="/main/student_manage/query_student">查询学生</Link></Menu.Item>*/}
                               </SubMenu> :
                                   ''
                           }
                           {/*<SubMenu key="student_manage" title={<span><Icon type="usergroup-add" /><span>学生管理</span></span>}>*/}
                               {/*<Menu.Item key="add_student"><Link to="/main/student_manage/add_student">添加学生到课程</Link></Menu.Item>*/}
                               {/*/!*<Menu.Item key="query_student"><Link to="/main/student_manage/query_student">查询学生</Link></Menu.Item>*!/*/}
                           {/*</SubMenu>*/}
                           {/*{*/}
                               {/*this.state.roleSet == 1 ? <SubMenu key="teacher_manage" title={<span><Icon type="user-add" /><span>教师管理</span></span>}>*/}
                                       {/*<Menu.Item key="add_teacher"><Link to="/main/teacher_manage/add_teacher">添加教师</Link></Menu.Item>*/}
                                       {/*<Menu.Item key="query_teacher"><Link to="/main/teacher_manage/query_teacher">查询教师</Link></Menu.Item>*/}
                                   {/*</SubMenu> :*/}
                                   {/*''*/}
                           {/*}*/}

                           {
                               this.state.roleSet == 1 ? <SubMenu key="dic_manage" title={<span><Icon type="user" /><span>组织管理</span></span>}>
                                       <Menu.Item key="dict_type"><Link to="/main/dic_manage/dict_type">字典信息</Link></Menu.Item>
                                   {/*<Menu.Item key="dict_list"><Link to="/main/dic_manage/dic_list">学校列表</Link></Menu.Item>*/}
                                   <Menu.Item key="change_information"><Link to="/main/dic_manage/user_list">角色列表</Link></Menu.Item>
                               </SubMenu> :
                                   ''
                           }
                       </Menu>
                   </div>
               </div>
               <div id="rightWrap">
                   <HeaderBar></HeaderBar>
                   <div className="right-box" style={{background:'#F5F5F5', height:'90%'}}>
                       <Switch>
                           <Route path="/main/homepage" component={Homepage}/>
                           <Route path="/main/signin_manage/call_signin" component={CallSignIn}/>
                           <Route path="/main/signin_manage/querySign" component={QuerySignIn}/>
                           <Route path="/main/student_manage/add_student" component={AddStudent}/>
                           <Route path="/main/student_manage/query_student" component={QueryStudent}/>
                           <Route path="/main/teacher_manage/add_teacher" component={AddTeacher}/>
                           <Route path="/main/teacher_manage/query_teacher" component={QueryTeacher}/>
                           <Route path="/main/class_manage/add_class" component={AddClass}/>
                           <Route path="/main/class_manage/query_class" component={QueryClass}/>
                           <Route path="/main/class_manage/class_info" component={ClassInfo}/>
                           <Route path="/main/personal_center/change_password" component={ChangePassword}/>
                           <Route path="/main/personal_center/change_information" component={ChangeInformation}/>
                           <Route path="/main/dic_manage/dic_list" component={DicList}/>
                           <Route path="/main/dic_manage/user_list" component={UserList}/>
                           <Route path="/main/dic_manage/dict_type" component={DictType}/>
                       </Switch>
                   </div>

               </div>
           </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        subjectinfo: state.subjectinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        subjectinfoActions: bindActionCreators(subjectinfoActions, dispatch),
        classinfoActions: bindActionCreators(classinfoActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)