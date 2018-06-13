import React from 'react'
import { connect } from 'react-redux'
import { changsongname, changsongindex, changsonglist, showbar } from './store/action'

import axios from 'axios'

class SongForm extends React.Component {

    constructor(p) {
        super(p)
        this.state = {
            IP: 'http://192.168.43.195:3000',
            id: '',
            forminfo: {},
            songlist: []
        }
    }

    componentWillMount() {
        this.props.dispatch(showbar)
        let id = this.props.location.search.slice(1, )
        axios.get(this.props.IP + '/getforminfo', { params: { _id: id } }).then(data => {
            this.setState({
                forminfo: data.data,
                songlist: data.data.song_list
            })
        })
    }

    render() {
        // console.log(this.state.songlist)
        return (<div>
            <div className="from_info_hearder">
                <i onClick={this.goback.bind(this)}>&lt;</i>
                <span>歌单</span>
                <img src='../find_play.png' onClick={this.goplay.bind(this)} />
            </div>
            <div className='from_info'>
                <div>
                    <img src={this.props.IP + this.state.forminfo.form_img} />
                    <div>{this.state.forminfo.form_name}</div>
                </div>
                <div className='from_info_bar'>
                    <div>
                        <i className='iconfont icon-pinglun'></i>
                        <div>2322</div>
                    </div>
                    <div>
                        <i className='iconfont icon-pinglun'></i>
                        <div>2322</div>
                    </div>
                    <div>
                        <i className='iconfont icon-pinglun'></i>
                        <div>2322</div>
                    </div>
                    <div>
                        <i className='iconfont icon-pinglun'></i>
                        <div>2322</div>
                    </div>
                </div>
            </div>
            <div>
                <ul className='song_list'>
                    {this.state.songlist.map((item, index) => {
                        return <li onClick={this.gosong.bind(this, index)} key={index}>
                            <span>{index + 1}</span>
                            <div className="songmain">
                                <h2>{item.song_name}</h2>
                                <h4>{item.singer}</h4>
                            </div>
                            <i className='iconfont icon-bofang'></i>
                        </li>
                    })}
                </ul>
            </div>
        </div>)
    }

    goplay() {
        this.props.history.push('/songplay')
    }

    goback() {
        this.props.history.goBack()
    }

    gosong(index) {
        this.props.dispatch(changsonglist(this.state.songlist))
        this.props.dispatch(changsongindex(index))
        this.props.history.push({ pathname: '/songplay' })
    }

}
function filter(data) {
    return {
        IP: data.getwebip
    }
}

export default connect(filter)(SongForm)