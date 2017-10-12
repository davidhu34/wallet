import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { textInputStyle } from '../styles'

const TextInputModal = ({
	resolve, title, text
}) => {
	let input
	return <div>
		<strong>{title}</strong>
		<br />
		<div className="container">
		<textarea ref={ ref => { input = ref } }
			style={textInputStyle}
			onKeyPress={ (e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault()
					console.log(input.value)
				}
			}}>
		</textarea>
		</div>
		<br />
		<div onClick={ (e) => resolve(number) }>APPLY</div>
		<div onClick={ (e) => resolve(-1) }>CANCEL</div>
	</div>
}

export default connect(
	state => ({ }),
	dispatch => ({
	})
)(TextInputModal)
