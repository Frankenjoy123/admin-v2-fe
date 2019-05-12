import React , {Component} from 'react';
import {BrowserRouter as Router , Route , Link , Switch, Redirect}   from 'react-router-dom';

import ErrorPage from 'page/error/index.jsx';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';


export default class ProductRoute extends Component{
    render(){

        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Redirect exact from="/product" to="/product/index"/>
                <Route component={ErrorPage}/>
            </Switch>
        )
    }
}