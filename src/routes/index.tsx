import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Capsule from '../pages/Capsule';
import Hook from '../pages/Hook';
// import routeMap from './routeMap';
import HOME from '../pages/Home';
import RenderPropDemo from '../pages/RenderProp';

export default class RouteMap extends Component {
    // private getRoute = () => {
    //     const basic = '/demo/';
    //     return routeMap.map((route, index) => {
    //         return <Route key={index} path={ `${basic}${route.name}` } component={route.component}/>;
    //     });
    // }

    render () {
       return (
        <HashRouter>
            <Switch>
                <Route path="/" exact={true} component={HOME}/>
                <Route path="/capsule" exact={true} component={Capsule} />
                <Route path="/hook" exact={true} component={Hook}/>
                <Route path="/renderProp" exact={true} component={RenderPropDemo}/>
                {/* {
                    this.getRoute()
                } */}
            </Switch>
        </HashRouter>
       );
    }
}