import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import Login from './container/login/index'
import Main from './container/main/index'
import ForgotPassword from './container/forgot_password/forgot_password'
import configureStore from './store/configureStore'
import './assets/css/style.css'
import 'antd/dist/antd.css'
import {HashRouter, Route, Switch} from 'react-router-dom'
import NotFound from './container/main/not_found/not_found'
import Register from './container/register/register'

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/main" component={Main} />
                    <Route path="/forgotpassword" component={ForgotPassword}/>
                    {/*<Route component={NotFound}/>*/}
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </HashRouter>
    </Provider>
), document.getElementById('app'));



