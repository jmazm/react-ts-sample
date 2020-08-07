import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import HOME from '../pages';

export default class RouteMap extends Component {

    render () {
       return (
        <HashRouter>
            <Switch>
                <Route path="/echarts" exact={true} component={HOME}/>
            </Switch>
        </HashRouter>
       );
    }
}