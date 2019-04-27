

import React , {Component} from 'react'
import {Link} from 'react-router-dom'

import MUtil from '../../util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm   = new MUtil();
const _user = new User();

export default class NavTop extends Component{

    constructor(props){
        super(props);
        this.state ={
            userInfo : {}
        }
    }

    componentDidMount(){
        let userInfo = _mm.getValue('userInfo');

        if(userInfo){
            this.setState({
                userInfo : userInfo
            })
        }
    }

    onLogout(){
        console.log('logout');
        _user.logout().then(
            res => {
                _mm.delele('userInfo');
                window.location.href = '/login';
            } , errMsg => {
                _mm.errorTips(errMsg);
            }
        )
    }

    render(){

        return (
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-envelope fa-fw"></i>
                                <span>
                                    欢迎 {this.state.userInfo && this.state.userInfo.username ? this.state.userInfo.username :''}</span>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-messages">
                            <li>
                                <a onClick={(e) => {this.onLogout(e)}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }

}