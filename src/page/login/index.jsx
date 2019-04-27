
import React from 'react';
import './index.scss';

import MUtil from '../../util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm   = new MUtil();
const _user = new User();


export  default  class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            redirect : _mm.getUrlParam("redirect") ||'/'
        }
    }

    componentWillMount(){
        document.title = "login";
    }

    onInputChange(e) {
        let inputName = e.target.name,
            inputValue = e.target.value;

        // console.log("name : " + inputName +  ", value : " + inputValue );

        this.setState({
            [inputName] : inputValue
        });
    }

    onInputKeyup(e){
        if(e.keyCode == 13){
            this.onSubmit();
        }
    }

    onSubmit(){

        // let redi = _mm.getUrlParam("redirect");

        let userInfo ={
            username : this.state.username,
            password : this.state.password
        };

        let checkResult = _user.checkLoginInfo(userInfo);

        if(checkResult.status){
            _user.login(
                {
                    username : this.state.username,
                    password : this.state.password
                }
            ).then( res => {
                _mm.setKeyValue('userInfo',res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }else {
            _mm.errorTips(checkResult.msg);
        }

    }

    render(){
        return (
          <div>

              <div className="row">

                  <div className="col-md-4 col-md-offset-4">
                      <div className="panel panel-default login-panel" >
                          <div className="panel-heading">
                              <h3 className="panel-title">欢迎登录-MMALL管理系统</h3>
                          </div>
                          <div className="panel-body">

                              <div>
                                  <div className="form-group">
                                      <input type="text"
                                             name="username"
                                             className="form-control"
                                             placeholder="请输入用户名"
                                             onKeyUp={(e) => this.onInputKeyup(e)}
                                             onChange={(e) => this.onInputChange(e)}/>
                                  </div>
                                  <div className="form-group">
                                      <input type="password"
                                             name="password"
                                             className="form-control"
                                             placeholder="请输入密码"
                                             onKeyUp={(e) => this.onInputKeyup(e)}
                                             onChange={(e) => this.onInputChange(e)}/>
                                  </div>

                                  <button type="submit" className="btn btn-primary btn-lg btn-block"
                                        onClick={e => this.onSubmit(e)}>登录</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
        );
    }
}