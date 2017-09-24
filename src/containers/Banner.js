import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { launchFilter } from '../actions'

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

const Banner = ({
	expand, title, filter,
	launchFilter
}) => {
	const filters = Object.keys(filter).map( k => {
		return <div onClick={ (e) => { launchFilter(k, filter[k]) }}>
			{k}
		</div>
	})
	return <div style={bannerStyle}>
		{title}
		{filters}
	</div>
}

export default connect(
	({ ui, filter }) => ({
		...ui.banner, filter
	}),
	dispatch => ({
		launchFilter: (filter, opt) => dispatch(launchFilter(filter, opt))
	})
)(Banner)
