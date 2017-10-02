import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
	toggleExpandFilters,
	launchCategoryFilter,
	launchAmountFilter
} from '../actions'

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
	categoryFilter, amountFilter, toggleExpandFilters
}) => {
	return <div style={bannerStyle}>
		<h4>{title}</h4>
		<div onClick={(e) => toggleExpandFilters()}>filters</div>
		{expand?<table><tbody><tr>
			<td><div><b>TIME</b>
				<div onClick={(e) => {}}>from</div>
				<div>{filter.selected.time.from || '--'}</div>
				<div onClick={(e) => {}}>to</div>
				<div>{filter.selected.time.to || '--'}</div>
			</div></td>
			<td><div><b>AMOUNT</b>
				<div onClick={(e) => amountFilter(0)}>min</div>
				<div>{filter.selected.amount.min || '--'}</div>
				<div onClick={(e) => amountFilter(1)}>max</div>
				<div>{filter.selected.amount.max || '--'}</div>
			</div></td>
			<td><div><b>CATEGORY</b>
				{Object.keys(filter.class).map( k => {
					let filterClass = filter.class[k]
					return <div key={k}
						onClick={ (e) => {
							categoryFilter(filterClass)
						}}>
						{filterClass.name}
					</div>
				})}
			</div></td>
		</tr></tbody></table>:<span />}
	</div>
}

export default connect(
	({ ui, filter }) => ({
		...ui.banner, filter
	}),
	dispatch => ({
		categoryFilter: (c) => dispatch(launchCategoryFilter({
			class: c.id, title: 'filter '+c.name+' category' 
		})),
		amountFilter: (type) => dispatch(launchAmountFilter({
			title: type == 0? 'MIN AMOUNT': 'MAX AMOUNT',
			type: type
		})),
		toggleExpandFilters: () => dispatch(toggleExpandFilters())
	})
)(Banner)
