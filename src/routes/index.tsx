import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Capsule from '../pages/Capsule';

import HOME from '../pages/Home';

export default class RouteMap extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact={true} component={HOME} />
          <Route path="/capsule" exact={true} component={Capsule} />
        </Switch>
      </HashRouter>
    );
  }
}