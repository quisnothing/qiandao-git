import React from 'react';
import { Form, Input, Select, Row, Col, Button, Breadcrumb,Icon } from 'antd';
import {connect} from 'react-redux'
import * as URL from '../../../component/interfaceURL'
import httpServer from '../../../component/httpServer'
import BreadcrumbCustom from '../../../component/BreadcrumbCustom'
import { Link } from 'react-router-dom';

class NotFound extends React.Component{
    constructor(){
        super();
        this.state={};
    }

    render(){
        return(
            <div id="page-wrapper">
                <div className="row" style={{marginTop: '30px'}}>
                    <div className="col-md-12">
                        <Row type="flex" justify="center">
                            <Col >
                                <h1>404</h1>
                                <Link to='/login'>点我返回</Link>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(NotFound)