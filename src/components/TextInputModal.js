import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { textInputStyle, footerStyle } from '../styles'

const TextInputModal = ({
	resolve, title, defaultText
}) => {
	let input
	return <div className="container">
        <br />
        <h5>{title}</h5>

		<div className="container">
			<textarea ref={ ref => { input = ref } }
				style={textInputStyle}
				onKeyPress={ (e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault()
						console.log(input.value)
					}
				}}>
				{defaultText}
			</textarea>
		</div>

		<div className="container"
			style={footerStyle}>

			<div className="row">
				<div className="six columns" onClick={ (e) => resolve('') }>
					<h5>CANCEL</h5>
				</div>
				<div className="six columns" onClick={ (e) => resolve(input.value) }>
					<h5>APPLY</h5>
				</div>
			</div>

		</div>
	</div>
}

export default connect(
	state => ({ }),
	dispatch => ({
	})
)(TextInputModal)
