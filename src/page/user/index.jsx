
import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import './index.scss';

import Pagination from "component/pagination/index.jsx";

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
const _mm   = new MUtil();
const _user = new User();


export  default  class UserList extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            pageNum :1,
            list : []
        }
    }

    componentDidMount(){
        this.loadUserList();
    }

    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        } , errMsg => {
            _mm.errorTips(errMsg);
        })
    }

    onPageChange(pageNum){
        console.log(pageNum);
        this.setState({
            pageNum:pageNum
        },() => {
            this.loadUserList();
        })
    }

    render(){

        let emptyBobyContent = (
            <tr>
                <td colSpan={5} className="text-center">没有数据记录</td>
            </tr>
        );

        let hasDataContent = this.state.list.map((item,index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{new Date(item.createTime).toLocaleString()}</td>
                </tr>
            );
        });

        let tbodyContent = this.state.list.length > 0 ? hasDataContent : emptyBobyContent;

        return (
          <div id="page-wrapper">
              <PageTitle title="用户列表"/>
              <div className="row">
                  <div className="col-md-12">

                      <table className="table table-striped table-borded">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>名称</th>
                                  <th>电话</th>
                                  <th>邮箱</th>
                                  <th>创建时间</th>
                              </tr>
                          </thead>

                          <tbody>{tbodyContent}</tbody>

                      </table>

                      <Pagination current={this.state.pageNum}
                                  total={this.state.pages}
                                  onChange={(pageNum) => this.onPageChange(pageNum)}/>

                  </div>
              </div>
          </div>
        );
    }
}