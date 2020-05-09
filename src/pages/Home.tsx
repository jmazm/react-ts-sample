// import * as React from 'react';
import React from 'react';
// import RouteMap from '../routes/routeMap';

interface IProps {}
interface IState {
}

export default class Hello extends React.Component<IProps, IState> {
    constructor (props: any) {
        super(props);
    }
    render () {
        return (
            <div>
              {/* <ul>
                {
                    RouteMap.map((item, index) => {
                        <li><a href={}></a></li>
                    })
                }
              </ul> */}
            </div>
        )
    }
}