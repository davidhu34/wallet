import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const bannerStyle = {
	width: '100%',
	height: 300,
	position: 'absolute',
	top: 0,
	left:0,
	zIndex: 3,
	textAlign: 'center',
	backgroundImage: 'linear-gradient(0deg, transparent, white 80%)'
	//WebkitTextFillColor: 'transparent',
	//WebkitBackgroundClip: 'text'
}
const Banner = ({ expand, title }) => {

	return <div style={bannerStyle}>
		{title}
	</div>
}

export default connect(
	({ ui }) => ({
		...ui.banner
	}),
	dispatch => {

	}
)(Banner)