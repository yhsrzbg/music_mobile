import React from 'react'
import { connect } from 'react-redux'
import { changetopbarbotton } from '../store/action'

import axios from 'axios'


class Video extends React.Component {
    componentWillMount() {
        axios.get(this.props.IP + '/getvideos').then(data => {
            this.setState({ videolist: data.data })
        })
    }

    constructor(p) {
        super(p)
        this.state = {
            videolist: []
        }
    }


    render() {

        return (<div>
            <div>
                {this.showvideolist()}
            </div>
        </div>)

    }

    showvideolist() {
        return this.state.videolist.map((item, index) => {
            return <div className='video_box' key={index}>
                <video
                    src={this.props.IP + item.src}
                    width='100%'
                    poster={this.props.IP + item.img}
                    controls />
            </div>
        })
    }
}


function filter(data) {
    return {
        IP: data.getwebip
    }
}


export default connect(filter)(Video)