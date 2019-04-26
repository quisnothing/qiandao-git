import React from 'react';
import { Form, Input, Select, Row, Col, Button, Breadcrumb } from 'antd';
import {connect} from 'react-redux'
import * as URL from './interfaceURL'
import httpServer from './httpServer'
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;

export default class BreadcrumbCustom extends React.Component {
    constructor(){
        super();
    }
    render(){
        let lis = this.props.pathList.map(function(item,index){
            return(
                <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            );
        });

        return(
            <Breadcrumb>
                {lis}
            </Breadcrumb>
        )
    }
}