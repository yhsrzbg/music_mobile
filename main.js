import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import FindMain from './find/findmain'
import Mine from './mine/mine'
import Friend from './friend/friend'
import Acc from './account/account'


import SongForm from './song_form'
import Songplayer from './songplayer'

import Search from './search'

import Login from './login'

import DatePicker from 'antd/lib/date-picker';  // 加载 JS
// import 'antd/lib/date-picker/style/css';        

require("./main.css")

class Main extends React.Component {

    render() {
        return (<Router>
            <div className="main">
                <div className="showview">
                    <Route path='/find' component={FindMain}></Route>
                    <Route path='/mine' component={Mine}></Route>
                    <Route path='/friend' component={Friend}></Route>
                    <Route path='/' exact component={Acc}></Route>
                    <Route path='/songform' component={SongForm}></Route>
                    <Route path='/songplay' component={Songplayer}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/search' component={Search}></Route>
                    <div className={this.props.idshow == 'show' ? 'showview_botton' : 'hide'}></div>
                </div>
                <div className={this.props.idshow == 'show' ? 'bottonbar' : 'hide'}>
                    <Link to='/find/music'>
                        <img src="../fin_icon.png" />
                        <p>发现音乐</p>
                    </Link>
                    <Link to='/mine'><img src="../mine_icon.png" />
                        <p>我的音乐</p></Link>
                    <Link to='/friend'><img src="../friend_icon.png" />
                        <p>朋友</p></Link>
                    <Link to='/'><img src="../acc_icon.png" />
                        <p>账号</p></Link>
                </div>
            </div>
        </Router>)
    }

}

function filter(data) {
    return {
        idshow: data.bottonbarstate
    }
}



export default connect(filter)(Main)