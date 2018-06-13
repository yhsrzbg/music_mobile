import React from 'react'
import { connect } from 'react-redux'

import { Upload, message, Button, Icon } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'

const props = {
    name: 'file',
    action: '//192.168.43.195:3000/getuserimg',
    withCredentials: true,
    supportServerRender: true,
    headers: {
        authorization: 'http:',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        console.log(info)
    },
};

class User extends React.Component {



    componentWillMount() {
        if (sessionStorage.acc) {
            this.setState({ islogin: true, user: getStorage('acc', [])[1] })
        } else {
            this.setState({ islogin: false })
        }
    }

    constructor(p) {
        super(p)
        this.state = {
            islogin: false,
            user: '用户名'
        }
    }

    render() {

        return (<div>
            <div className='userbox'>
                <div>
                    <Upload {...props}>
                        <img onSubmit={() => { return true }} className='touxiang' src='../../header.jpg' />
                    </Upload>
                </div>
                <div>
                    {this.isuserlogin()}
                </div>
            </div>
            <div className='useroperate'>
                <div>粉丝<p>1</p></div>
                <div>关注<p>0</p></div>
                <div>动态<p>5</p></div>
                <div>特别关注<p>1</p></div>
            </div>
        </div>)

    }

    isuserlogin() {
        if (this.state.islogin) {
            return this.state.user
        } else {
            return <Link to='/login'>请登陆</Link>
        }
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

function filter(data) {
    return {
        IP: data.getwebip
    }
}

export default connect(filter)(User)