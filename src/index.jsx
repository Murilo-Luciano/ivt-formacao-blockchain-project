import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from './components/app.jsx'
import store from './ducks'

const MainApp =(
    <Provider store={store}>
        <App />
    </Provider>
) 

ReactDOM.render(MainApp, document.getElementById('root'))