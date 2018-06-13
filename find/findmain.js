import React from 'react'

import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'


import Music from './music'
import Video from './video'
import Radio from './radio'

require("./find.css")


class FindMain extends React.Component {

    constructor(p) {
        super(p)
        this.state = {
            bar: '音乐'
        }
    }

    render() {
        return (<Router>
            <div>
                <div className='header_hearo'></div>
                <header>
                    <div className="header_top">
                        <img src='../../find_listen.png' />
                        <input type="text" placeholder="搜索音乐、歌词、电台" onFocus={this.gosearch.bind(this)} />
                        <img src='../../find_play.png' onClick={this.goplay.bind(this)} />
                    </div>
                    <div className="header_top2" onClick={this.chosebarseat.bind(this)}>
                        <span className={this.state.bar == '音乐' ? 'headerselect' : ''}>音乐</span>
                        <span className={this.state.bar == '视频' ? 'headerselect' : ''}>视频</span>
                        <span className={this.state.bar == '电台' ? 'headerselect' : ''}>电台</span>
                    </div>
                </header>
                <div>
                    <Route path='/find/music' component={Music}></Route>
                    <Route path='/find/video' component={Video}></Route>
                    <Route path='/find/radio' component={Radio}></Route>
                </div>
            </div>
        </Router>)

    }

    gosearch() {
        this.props.history.push('/search')
    }

    goplay() {
        this.props.history.push('/songplay')
    }

    chosebarseat(e) {
        if (e.target.nodeName == 'SPAN') {
            switch (e.target.innerHTML) {
                case '音乐':
                    this.setState({ bar: '音乐' })
                    this.props.history.push('/find/music')
                    break;
                case '视频':
                    this.setState({ bar: '视频' })
                    this.props.history.push('/find/video')
                    break;
                case '电台':
                    this.setState({ bar: '电台' })
                    this.props.history.push('/find/radio')
                    break;
            }
        }
    }

}


function filter(data) {
    return {
        barseat: data.findbar
    }
}


export default connect(filter)(FindMain)