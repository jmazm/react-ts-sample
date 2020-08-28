import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import RouteMap from './routes';


const render = (RouteMap: any) => {
  ReactDOM.render(
    <RouteMap />,
    document.getElementById('root') 
  );

};

render(RouteMap);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
  // module.hot.accept('./pages/index', () => {
  // 	render(Mobile);
  // })
}