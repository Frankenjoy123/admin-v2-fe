
import React from 'react';
import './index.scss';

import MUtil from '../../util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();


export  default  class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            redirect : _mm.getUrlParam('redirect') || '/'
        }
    }

    onInputChange(e) {
        let inputName = e.target.name,
            inputValue = e.target.value;

        // console.log("name : " + inputName +  ", value : " + inputValue );

        this.setState({
            [inputName] : inputValue
        });
    }

    onSubmit(){

        _user.login(
            {
                username : this.state.username,
                password : this.state.password
            }
        ).then( data => {
            console.log(this.state.redirect);
            // this.props.history.push(_mm.get(this.state.redirect));
        }).catch( errMsg => {
                _mm.errorTips(errMsg);
        })

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
                                             onChange={(e) => this.onInputChange(e)}/>
                                  </div>
                                  <div className="form-group">
                                      <input type="password"
                                             name="password"
                                             className="form-control"
                                             placeholder="请输入密码"
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