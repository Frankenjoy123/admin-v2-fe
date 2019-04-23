
import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

export  default  class Home extends React.Component {

    render(){
        return (
          <div id="page-wrapper">
              <PageTitle title="首页">
                  <button className="btn btn-waring"></button>
              </PageTitle>
              <div className="row">
                  <div className="col-md-12">
                      body
                  </div>
              </div>
              <button className="btn btn-default">test</button>
          </div>
        );
    }
}