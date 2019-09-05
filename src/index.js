import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'
import App from './App'
import Store from './Store';
const stores = { Store }
ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)