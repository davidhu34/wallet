import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
	toggleExpandFilters,
	launchCategoryFilter,
	launchAmountFilter,
	changeContent
} from '../actions'

import { bannerStyle, categoryStyle } from '../styles'

const Banner = ({
	expand, title, filter, content,
	categoryFilter, amountFilter, toggleExpandFilters, toHome
}) => {
	return <div style={{
			...bannerStyle,
			height: expand? 600:300
		}}>
		<h3 onClick={(e) => toHome()}>{title}</h3>
		{content == 'RECORD_LIST'?
			<h5 onClick={(e) => toggleExpandFilters()}>filters</h5>
			: <span></span>
		}
		{expand && content == 'RECORD_LIST'?
			<table style={{width: '100%'}}><tbody><tr>
				<td style={categoryStyle}>
					<div><b>TIME</b>
						<div onClick={(e) => {}}>from</div>
						<div>{filter.selected.time.from || '--'}</div>
						<div onClick={(e) => {}}>to</div>
						<div>{filter.selected.time.to || '--'}</div>
					</div>
				</td>
				<td style={categoryStyle}>
					<div><b>AMOUNT</b>
						<div onClick={(e) => amountFilter(0)}>min</div>
						<div>{filter.selected.amount.min || '--'}</div>
						<div onClick={(e) => amountFilter(1)}>max</div>
						<div>{filter.selected.amount.max || '--'}</div>
					</div>
				</td>
				<td style={categoryStyle}><div><b>CATEGORY</b>
						{Object.keys(filter.class).map( k => {
							let filterClass = filter.class[k]
							return <div key={k}
								onClick={ (e) => {
									categoryFilter(filterClass)
								}}>
								{filterClass.name}
							</div>
						})}
					</div>
				</td>
			</tr></tbody></table>
			:<span />
		}
	</div>
}

export default connect(
	({ ui, filter }) => ({
		...ui.banner, filter, content: ui.content
	}),
	dispatch => ({
		categoryFilter: (c) => dispatch(launchCategoryFilter({
			class: c.id, title: 'filter '+c.name+' category' 
		})),
		amountFilter: (type) => dispatch(launchAmountFilter({
			title: type == 0? 'MIN AMOUNT': 'MAX AMOUNT',
			type: type
		})),
		toggleExpandFilters: () => dispatch(toggleExpandFilters()),
		toHome: () => dispatch( changeContent('HOME'))
	})
)(Banner)
