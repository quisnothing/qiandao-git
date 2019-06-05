import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import * as userinfoActions from '../../../actions/userinfo'
import httpServer from '../../../component/httpServer'
import * as URL from '../../../component/interfaceURL'

const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;


class HeaderBar extends React.Component{

    constructor(){
        super()
    }

    componentWillMount(){  //将要装载，在render之前调用
        //如果状态管理中没有内容（用户刷新网页）
        //去取localStorage的用户名
        if(!this.props.userinfo.userName) {
            if(localStorage.getItem("userName")) {
                //发送Action  向Store 写入用户名
                this.props.userinfoActions.login({
                    userName: localStorage.getItem("userName")
                })

            }
        }
    }

    handleClick(e){
        //退出
        if(e.key == 'sign_out') {
            localStorage.removeItem("userName");

            //发送Action  向Store 清除用户名
            this.props.userinfoActions.login({
                userName: ""
            })

        }
    }

    render(){
        return(
            <Menu
                mode="horizontal"
                onClick={this.handleClick.bind(this)}
            >
                <SubMenu title={<span><Icon type="user" />{this.props.userinfo.userName}</span>}>
                    <Menu.Item key="sign_out"><Link to="/login">退出</Link></Menu.Item>
                    {/*<Menu.Item key="change_password"><Link to="/main/personal_center/change_password">修改密码</Link></Menu.Item>*/}
                    <Menu.Item key="change_information"><Link to="/main/personal_center/change_information">修改信息</Link></Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderBar)