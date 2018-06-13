import React from 'react'
import { connect } from 'react-redux'

import { Upload, message, Button, Icon } from 'antd';


const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
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
    },
};



class Radio extends React.Component {


    render() {

        return (<div>
            <div className='uptest'>
                <Upload {...props}>
                    <span onSubmit={() => { return true }}>111111</span>
                </Upload>
            </div>

        </div>)

    }

}

export default connect()(Radio)