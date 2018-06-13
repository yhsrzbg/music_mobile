import React from 'react'

import store from './store/index'
import { Provider } from "react-redux";

import Main from './main'


class App extends React.Component {

    render() {
        return (<Provider store={store}>
            <Main />
        </Provider>
        )
    }

}

export default App