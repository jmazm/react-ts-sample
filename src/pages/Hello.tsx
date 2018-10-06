// import * as React from 'react';
import React from 'react';

export default class Hello extends React.Component {
    constructor (props: any) {
        super(props);
        this.state = {
            infoList: [],
            age: 0
        };

        this.addInfo = this.addInfo.bind(this);
    }
    render () {
        const { infoList } = this.state;
        return (
            <div>
                <p>Hello!</p>
                <div>name: <input type="text"/></div>
                <div>age: <input type="number"/></div>
                <div><button type="button" onClick={ this.addInfo }>添加</button></div>
                <ul>
                    {
                        infoList.length > 0 ? 
                            infoList.map((info: string, key: number) => {
                                return <li key={ key }>{ info }</li>
                            }):
                            <li>暂无数据！</li>
                    }
                </ul>
            </div>
        )
    }
    componentDidMount () {
        
    }
    addInfo () {
        let age = 12;
        this.setState({
            age
        });
    }
}