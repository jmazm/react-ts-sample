import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RouteMap from './routes';


const render = (RouteMap: any) => {
  ReactDOM.render(
    <RouteMap />,
    document.getElementById('root') as HTMLElement
  );

};

render(RouteMap);
