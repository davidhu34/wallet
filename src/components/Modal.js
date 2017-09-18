import React, { Component } from 'react';

const Modal = ({ color, children }) => {
	return <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left:0,
        backgroundColor: color,
        //WebkitTextFillColor: 'transparent',
        //WebkitBackgroundClip: 'text'
	}}>
		{children}
	</div>
}

export default Modal