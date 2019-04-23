
import React , {Component} from 'react'

export default class PageTitle extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.title = this.props.title + '-HAPPY MMALL';
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className={"page-header"}>{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }

}