import React from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

require("./banner.css")

class Banner extends React.Component {

    componentWillMount() {
        axios.get(this.props.IP + '/getbanner').then(data => {
            var index = 1
            this.setState({
                bannerbox: data.data,
                nowsrc: data.data[0],
                bannerstyle: { backgroundImage: `url(${this.props.IP + data.data[0]})` }
            })
            setInterval(() => {
                this.setState({
                    bannerstyle: { backgroundImage: `url(${this.props.IP + this.state.bannerbox[index]})` }
                })
                index++;
                if (index >= this.state.bannerbox.length) {
                    index = 0;
                }
            }, 4000)
        })
    }

    constructor(p) {
        super(p)
        this.state = {
            bannerbox: [],
            nowsrc: '',
            bannerstyle: {}
        }
    }

    render() {

        return (<div>
            <div className='banner' style={this.state.bannerstyle}>

            </div>
        </div>)

    }

}

function filter(data) {
    return {
        IP: data.getwebip
    }
}

export default connect(filter)(Banner)