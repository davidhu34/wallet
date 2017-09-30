import React, { Component } from 'react';

const Modal = ({ children, color }) => {

	return <div style={{
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		left:0,
		zIndex: 4,
		paddingTop: 100,
		backgroundColor: color,
		textAlign: 'center'
		//WebkitTextFillColor: 'transparent',
		//WebkitBackgroundClip: 'text'
	}}>
		{children}
	</div>
}

export default Modal