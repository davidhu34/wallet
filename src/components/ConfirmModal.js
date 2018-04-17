import React, { Component } from 'react'
import { connect } from 'react-redux'

import { footerStyle } from '../styles'

const ConfirmModal = ({
	resolve, title, message
}) => {
	let input
	return <div className="container">
        <br />
        <h5>{title || ''}</h5>

		<br />
		<br />
		<br />

		<h5>{message}</h5>

		<div className="container"
			style={footerStyle}>

			<div className="row">
				<div className="six columns" onClick={ (e) => resolve(false) }>
					<h5>CANCEL</h5>
				</div>
				<div className="six columns" onClick={ (e) => resolve(true) }>
					<h5>OK</h5>
				</div>
			</div>

		</div>
	</div>
}

export default ConfirmModal
