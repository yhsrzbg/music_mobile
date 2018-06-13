import React from 'react'

import { connect } from 'react-redux'
import { hidebar, showbar, changsonglist, changsongindex } from './store/action'
import axios from 'axios'



class Search extends React.Component {

    constructor(p) {
        super(p)
        this.state = {
            searchlist: []
        }
    }


    render() {

        return (<div>
            <div className="header_top">
                <input type="search"
                    className='search_input'
                    ref='searchvalue'
                    placeholder="随便听听？"
                    onFocus={() => { this.props.dispatch(hidebar) }}
                    onBlur={() => { this.props.dispatch(showbar) }}
                    onKeyPress={this.search.bind(this)} />
                <span className='search_clear' onClick={this.goback.bind(this)}>取消</span>
            </div>
            <div>
                <div>
                    <ul className='song_list'>
                        {this.songlist()}
                    </ul>
                </div>
            </div>
        </div>)

    }

    goback() {
        this.props.history.goBack()
    }
    search(e) {
        if (e.which == 13) {
            axios.get(this.props.IP + '/search', { params: { song_name: this.refs.searchvalue.value } }).then(data => {
                this.setState({ searchlist: data.data })
            })
        }
    }
    songlist() {
        if (this.state.searchlist.length > 0) {
            console.log(this.state.searchlist)
            return this.state.searchlist.map((item, index) => {
                return <li onClick={this.gosong.bind(this, index)} key={index}>
                    <span>{index + 1}</span>
                    <div className="songmain">
                        <h2>{item.song_name}</h2>
                        <h4>{item.singer}</h4>
                    </div>
                    <i className='iconfont icon-bofang'></i>
                </li>
            })
        } else {
            return <li className='searchno'>暂无数据</li>
        }
    }
    gosong(index) {
        this.props.dispatch(changsonglist(this.state.searchlist))
        this.props.dispatch(changsongindex(index))
        this.props.history.push({ pathname: '/songplay' })
    }

}

function filter(data) {
    return {
        IP: data.getwebip
    }
}

export default connect(filter)(Search)