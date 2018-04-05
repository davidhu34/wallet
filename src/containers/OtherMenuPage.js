import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import DownloadIcon from 'react-icons/lib/io/ios-download-outline'
import UploadIcon from 'react-icons/lib/io/ios-cloud-upload-outline'

const OtherMenuPage = ({
    changeContent
}) => {
    return <div className="container">
        <div className="row">
            <h5>Load Demo Data</h5>
        </div>

        <div className="row" ><br /> </div>

        <div className="row">
            <h5>Sync with Google Drive</h5>
        </div>
        <div className="row">
            <div className="three columns" style={{ color: 'transparent' }}>{'-'}</div>

            <div className="three columns" >
                <div style={{fontSize: '4.0rem'}}>
                    <UploadIcon />
                </div>
                Upload
            </div>

            <div className="three columns" >
                <div style={{fontSize: '4.0rem'}}>
                    <DownloadIcon />
                </div>
                Download
            </div>

            <div className="three columns" />
        </div>
        <div className="row" ><br /> </div>
        <div className="row" >
            <div className="two columns" style={{ color: 'transparent' }}>{'-'}</div>
            <div className="three columns" ><h6>{'File Name: '}</h6></div>
            <div className="seven columns" style={{ textAlign:'left' }}>
                <u>sadc.csv</u>
            </div>
        </div>
        <div className="row" ><br /> </div>

        <div className="row">
            <h5>About</h5>
        </div>

    </div>

}

export default connect(
	state => ({}),
    dispatch => ({
        changeContent: (content) => dispatch( changeContent(content))
    })
)(OtherMenuPage)
