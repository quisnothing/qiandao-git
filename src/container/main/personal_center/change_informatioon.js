import React from 'react'
import { Card,Icon } from 'antd';
import { Link  } from 'react-router-dom';

export default class ChangeInformation extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return (
            <div className="change_information">
                <h2>change information</h2>
                <div style={{ left:'50%', bottom: '10px', position: 'fixed' }}>
                    Ant Design ©2018 Created by Ant UED
                </div>
            </div>
        )
    }
}