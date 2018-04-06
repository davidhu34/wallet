import React, { Component } from 'react'

import { modalStyle } from '../styles'

const Modal = ({ children, color }) => {

	return <div style={{
		...modalStyle,
		backgroundColor: color
		//WebkitTextFillColor: 'transparent',
		//WebkitBackgroundClip: 'text'
	}}>
		{children}
	</div>
}

export default Modal
