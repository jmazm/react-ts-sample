import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Capsule from '@/pages/Capsule';
import Hook from '@/pages/Hook';
// import routeMap from './routeMap';
import HOME from '@/pages/Home';
import RenderPropDemo from '@/pages/RenderProp';
import Echarts from '@/pages/Echarts'

export default class RouteMap extends Component {

    render () {
       return (
        <HashRouter>
            <Switch>
                <Route path="/" exact={true} component={HOME}/>
                <Route path="/capsule" exact={true} component={Capsule} />
                <Route path="/hook" exact={true} component={Hook}/>
                <Route path="/renderProp" exact={true} component={RenderPropDemo}/>
                <Route path="/echarts" exact={true} component={Echarts}/>
            </Switch>
        </HashRouter>
       );
    }
}