import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { launchCategoryFilter } from '../actions'

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
	return <div style={bannerStyle}>
		{title}
		<table><tobdy><tr>
			<td>TIME</td>
			<td>AMOUNT</td>
			<td><div><b>CATEGORY</b>
				{Object.keys(filter.class).map( k => {
					let filterClass = filter.class[k]
					return <div key={k}
						onClick={ (e) => {
							launchFilter(filterClass.id)
						}}>
						{filterClass.name}
					</div>
				})}
			</div></td>
		</tr></tobdy></table>
	</div>
}

export default connect(
	({ ui, filter }) => ({
		...ui.banner, filter
	}),
	dispatch => ({
		launchFilter: (c) => dispatch(launchCategoryFilter(c))
	})
)(Banner)
