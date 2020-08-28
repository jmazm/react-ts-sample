import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HOME from '../pages';

export default class RouteMap extends Component {

    render () {
       return (
        <BrowserRouter>
            <Switch>
                <Route path="/charts" exact={true} component={HOME}/>
            </Switch>
        </BrowserRouter>
       );
    }
}