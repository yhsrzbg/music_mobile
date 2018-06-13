import React from 'react'
import { connect } from 'react-redux'
import { changsongname, changsongindex, changsonglist, showbar } from '../store/action'


import axios from 'axios'

class Mine extends React.Component {


    componentWillMount() {
        // console.log(getStorage('acc', []))
        if (getStorage('acc', []).length > 0) {
            console.log('23333')
            axios.get(this.props.IP + '/getuserhistory', { params: { _id: getStorage('acc', [])[0] } }).then(data => {
                this.setState({ historylist: data.data })
            })
        } else {
            // console.log('111111')
            this.props.history.push('/login')
        }
    }

    constructor(p) {
        super(p)
        this.state = {
            historylist: []
        }
    }

    render() {

        return (<div>
            <div className='loginheader'><i onClick={this.goback.bind(this)}>&lt;</i>最近播放</div>
            <div>
                <ul className='song_list'>
                    {this.state.historylist.map((item, index) => {
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


    goback() {
        this.props.history.goBack()
    }

    gosong(index) {
        this.props.dispatch(changsonglist(this.state.historylist))
        this.props.dispatch(changsongindex(index))
        this.props.history.push({ pathname: '/songplay' })
    }

}



function getStorage(key, type) {

    let data = sessionStorage[key];
    if (data) {
        return JSON.parse(data);//返回一个数组
    }
    else {
        return type || '';
    }
}

function filter(data) {
    return {
        IP: data.getwebip
    }
}

export default connect(filter)(Mine)