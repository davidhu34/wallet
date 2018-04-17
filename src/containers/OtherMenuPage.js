import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import DownloadIcon from 'react-icons/lib/io/ios-download-outline'
import UploadIcon from 'react-icons/lib/io/ios-cloud-upload-outline'

import { syncFromFile, uploadToFile, loadDemoData, launchAlert } from '../actions'
import BlankColumn from '../components/BlankColumn'

const OtherMenuPage = ({
	driveAPI,
	loadDemoData, uploadToFile, syncFromFile, launchAbout, changeContent
}) => {
	const { userInputFileName } = driveAPI

	return <div className="container">
		<div className="row">
			<h5 onClick={(e) => loadDemoData()}>Load Demo Data</h5>
		</div>

		<div className="row" ><br /> </div>

		<div className="row">
			<h5>Google Drive Sync</h5>
		</div>
		<div className="row">
			<BlankColumn size={3} />

			<div className="three columns"
				onClick={(e) => uploadToFile()}>
				<div style={{fontSize: '4.0rem'}}>
					<UploadIcon />
				</div>
				Upload
			</div>

			<div className="three columns"
				onClick={(e) => syncFromFile()}>
				<div style={{fontSize: '4.0rem'}}>
					<DownloadIcon />
				</div>
				Download
			</div>

			<div className="three columns" />
		</div>
		<div className="row" ><br /> </div>
		<div className="row" >
			<BlankColumn size={2} />
			<div className="three columns" ><h6>{'File Name: '}</h6></div>
			<div className="seven columns"
				style={{ textAlign:'left' }}
				onClick={(e) => {}}>
				<u>{userInputFileName}</u>{'.csv'}
			</div>
		</div>
		<div className="row" ><br /> </div>

		<div className="row">
			<h5 onClick={(e) => launchAbout()}>About</h5>
		</div>

	</div>

}

export default connect(
	({ driveAPI }) => ({
		driveAPI
	}),
	dispatch => ({
		loadDemoData: () => dispatch( loadDemoData() ),
		uploadToFile: (name) => dispatch( uploadToFile(name) ),
		syncFromFile: (name) => dispatch( syncFromFile(name) ),
		launchAbout: () =>  dispatch( launchAlert({ title:'ABOUT', message:'APP by Ming-Wei Hu' }) ),
		changeContent: (content) => dispatch( changeContent(content) )
	})
)(OtherMenuPage)
