import React from 'react'

import { connect } from 'react-redux'
import { changetopbarbotton } from '../store/action'


import MuiscForm from './music_mod/music_form'
import Banner from './music_mod/bannder'

class Music extends React.Component {


    render() {

        return (<div>
            <Banner />
            <div><img className='indeximg3' src="../../index3.jpg" /></div>
            <div className='form_titel1'>推荐歌单</div>
            <MuiscForm history={this.props.history} />
        </div>)

    }

}

export default connect()(Music)