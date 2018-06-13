import React from 'react'

import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'



import axios from 'axios'


class MusicForm extends React.Component {


    constructor(p) {
        super(p)
        this.state = {
            IP: 'http://192.168.43.195:3000',
            formbox: []
        }
    }

    componentDidMount() {
        axios.get(this.props.IP + '/getsongform').then(data => {
            this.setState({ formbox: data.data })
        })
    }


    render() {

        return (<div className='music_form'>
            {this.state.formbox.map(item => {
                return <div className='formsmlbox'
                    onClick={this.goform.bind(this, item._id)}
                    key={item._id}
                >
                    <img src={this.props.IP + item.form_img} />
                    <div className="formsmltitle">{item.form_name}</div>
                </div>
            })}
        </div>)

    }

    goform(id) {
        this.props.history.push({ pathname: '/songform/?' + id })
    }
}

function filter(data) {
    return {
        IP: data.getwebip
    }
}

export default connect(filter)(MusicForm)