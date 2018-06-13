import React from 'react'
import { connect } from 'react-redux'

import { showbar, hidebar } from './store/action'

import axios from 'axios'

class Login extends React.Component {

    componentWillMount() {
        this.props.dispatch(hidebar)
    }

    render() {

        return (<div>
            <div className='loginheader'><i onClick={this.goback.bind(this)}>&lt;</i>手机号登陆</div>
            <div className='logininputacc'>
                <input type='text' placeholder='手机号' ref='acc' />
            </div>
            <div className='logininputpwd'>
                <input type='password' placeholder='密码' ref='pwd' />
            </div>
            <div className='loginBtn' onClick={this.login.bind(this)}>
                <span>登陆</span>
            </div>
        </div>)

    }

    goback() {
        this.props.history.push('/')
    }

    login() {
        axios.post(this.props.IP + '/login', { acc: this.refs.acc.value, pwd: this.refs.pwd.value }).then(data => {
            if (data.data == 'no') {
                console.log('登陆失败')
            } else {
                saveStorage('acc', [data.data, this.refs.acc.value])
                this.props.history.push('/')
            }
        })
    }

}


function filter(data) {
    return {
        IP: data.getwebip
    }
}

//获取数据
function getStorage(key, type) {

    let data = sessionStorage[key];
    if (data) {
        return JSON.parse(data);//返回一个数组
    }
    else {
        return type || '';
    }
}
//存储数据
function saveStorage(key, data) {
    if (typeof data == 'object') {
        sessionStorage[key] = JSON.stringify(data);
    }
    else {
        sessionStorage[key] = data;
    }
}

export default connect(filter)(Login)