import React from 'react'

import User from './user'
import { connect } from 'react-redux'
import { showbar, hidebar } from '../store/action'


require('./account.css')

class Acc extends React.Component {


    componentWillMount() {
        this.props.dispatch(showbar)
    }


    render() {

        return (<div>
            <div className='mainheader_hearo'></div>
            <header className='mainheader'>账号<img src='../../find_play.png' onClick={this.goplay.bind(this)} /></header>
            <User />
        </div>)

    }

    goplay() {
        this.props.history.push('/songplay')
    }

}

export default connect()(Acc)