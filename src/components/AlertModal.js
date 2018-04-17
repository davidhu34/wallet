import React, { Component } from 'react'
import { connect } from 'react-redux'

import { footerStyle } from '../styles'

const AlertModal = ({
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
				<div className="twelve columns" onClick={ (e) => resolve(true) }>
					<h5>OK</h5>
				</div>
			</div>

		</div>
	</div>
}

export default AlertModal
