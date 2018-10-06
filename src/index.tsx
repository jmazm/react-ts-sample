import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './pages/Hello';

class App extends React.Component {  
    render () {
        return (
            <div>
                <Hello/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)

