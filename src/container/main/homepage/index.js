import React from 'react'
import { Card,Icon } from 'antd';
import { Link  } from 'react-router-dom';
import FastEnterCard from './subpage/faster_enter_card'

export default class Homepage extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return (
            <div className="homepage clearfix">
                <div className="fast-enter-card">
                    <Link to="/main/class_manage/add_class">
                        <FastEnterCard title="课程管理" icon="usergroup-add"></FastEnterCard>
                    </Link>
                </div>
                <div className="fast-enter-card">
                    <Link to="/main/student_manage/add_student">
                        <FastEnterCard title="学生管理" icon="usergroup-add"></FastEnterCard>
                    </Link>
                </div>
                {/*<div className="fast-enter-card">*/}
                    {/*<Link to="/main/teacher_manage/query_teacher">*/}
                        {/*<FastEnterCard title="教师管理" icon="user-add"></FastEnterCard>*/}
                    {/*</Link>*/}
                {/*</div>*/}
                <div className="fast-enter-card">
                    <Link to="/main/dic_manage/dic_type">
                        <FastEnterCard title="组织管理" icon="layout"></FastEnterCard>
                    </Link>
                </div>
                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}