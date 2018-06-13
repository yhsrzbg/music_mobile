import React from 'react'
import { connect } from 'react-redux'
import { changsongname, changsongindex, changsonglist, showbar, hidebar } from './store/action'
import Axios from 'axios';


class Songplayer extends React.Component {

    constructor(p) {
        super(p),
            this.state = {
                songinfo: {},
                IP: 'http://192.168.43.195:3000',
                isplay: true,
                nowtime: 0,
                alltime: 0,
                getmuiscseat: 0,
                israndom: false
            }
    }

    componentWillMount() {
        this.props.dispatch(hidebar)
    }
    componentDidMount() {
        this.pushhistory(this.props.list, this.props.index)
        var autio = this.refs.muiscplay
        autio.play()
        this.setState({
            getmuiscseat: setInterval(() => {
                this.setState({ nowtime: autio.currentTime, alltime: autio.duration }, () => {
                    if (this.state.nowtime >= this.state.alltime) {
                        this.next()
                    }
                })
            }, 300)
        })

    }

    render() {
        return (<div className='songmainshow'>
            <div className='song_header'>
                <i onClick={this.goback.bind(this)}>&lt;</i>
                <div>
                    <span>{this.props.list[this.props.index].song_name}</span>
                    <span>{this.props.list[this.props.index].singer}</span>
                </div>
                <i className='iconfont icon-fenxiang'></i>
            </div>
            <div className='songmain'>
                <div className='songimgbox'>
                    <div className='backg'>
                        <div className={this.state.isplay ? 'Rotation' : 'Rotation pausedRotation'}>
                            <img className='songimg' src={this.props.IP + this.props.list[this.props.index].img_src} />
                        </div>
                    </div>
                </div>
                <div className='control'>
                    <audio
                        ref='muiscplay'
                        src={this.props.IP + this.props.list[this.props.index].song_src}
                        autoPlay>
                    </audio>
                    <div className='songico'>
                        <i className='iconfont icon-xihuan'></i>
                        <i className='iconfont icon-xiazai'></i>
                        <i className='iconfont icon-pinglun'></i>
                        <i className='iconfont icon-gengduo'></i>
                    </div>
                    <div className='progress'>
                        <div>{this.timeConvert(this.state.nowtime)}</div>
                        <div className='mainprogress'>
                            <div className="progresspoint"
                                style={{ left: (~~this.state.nowtime / ~~this.state.alltime) * 100 + '%' }}>
                                <div className='pointcenter'></div>
                            </div>
                        </div>
                        <div>{this.timeConvert(this.state.alltime)}</div>
                    </div>
                    <div className='controlBtn'>
                        <i className={this.state.israndom ? 'iconfont icon-shunxubofang' : 'iconfont icon-suijibofang'} onClick={this.random.bind(this)}></i>
                        <i className='iconfont icon-shangyishou' onClick={this.last.bind(this)}></i>
                        <i className={this.state.isplay ? 'iconfont icon-zanting' : 'iconfont icon-bofang'} onClick={this.playpause.bind(this)}></i>
                        <i className='iconfont icon-shangyishou1' onClick={this.next.bind(this)}></i>
                        <i className='iconfont icon-shunxubofang'></i>
                    </div>
                </div>
            </div>
        </div>)

    }

    random() {
        this.setState({ israndom: !this.state.israndom })
        console.log(random(0, 3))
    }


    goback() {
        this.props.dispatch(showbar)
        clearInterval(this.state.getmuiscseat)
        this.props.history.goBack()
    }

    playpause() {
        if (this.state.isplay) {
            console.log('暂停')
            this.refs.muiscplay.pause()
            this.setState({ isplay: false })
        } else {
            console.log('开始')
            this.refs.muiscplay.play()
            this.setState({ isplay: true })
        }
    }

    last() {
        if (this.props.index >= 1) {
            this.pushhistory(this.props.list, this.props.index - 1)
            this.props.dispatch(changsongindex(this.props.index - 1))
            this.setState({ isplay: true })
        } else {
            alert('没有上一首了')
        }
    }

    next() {
        if (this.state.israndom) {
            let randomnum = random(0, this.props.list.length - 1)
            this.pushhistory(this.props.list, randomnum)
            this.props.dispatch(changsongindex(randomnum))
            this.setState({ isplay: true })
        } else {
            if (this.props.index + 1 < this.props.list.length) {
                this.pushhistory(this.props.list, this.props.index + 1)
                this.props.dispatch(changsongindex(this.props.index + 1))
                this.setState({ isplay: true })
            } else {
                alert('没有下一首了')
            }
        }
    }

    //加入历史纪录
    pushhistory(list, index) {
        // console.log(list[index]._id, getStorage('acc', [])[0])
        if (getStorage('acc', []).length > 0) {
            Axios.get(this.props.IP + '/addhistory', { params: { id: getStorage('acc', [])[0], songid: list[index]._id } }).then(data => {
                console.log(data.data)
            })
        }
    }

    //计算时间

    timeConvert(timestamp) {
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    }

    //计算百分比
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
        list: data.songlist,
        index: data.songindex,
        IP: data.getwebip
    }
}

function random(min, max) {
    if (!max) {
        return parseInt(Math.random() * (min + 1));
    }
    return parseInt(Math.random() * (max - min + 1)) + min;
}

export default connect(filter)(Songplayer)