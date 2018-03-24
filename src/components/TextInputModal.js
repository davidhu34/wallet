import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { textInputStyle } from '../styles'

const TextInputModal = ({
	resolve, title, defaultText
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
			{defaultText}
		</textarea>
		</div>
		<br />
		<div onClick={ (e) => resolve(input.value) }>APPLY</div>
		<div onClick={ (e) => resolve('') }>CANCEL</div>
	</div>
}

export default connect(
	state => ({ }),
	dispatch => ({
	})
)(TextInputModal)
