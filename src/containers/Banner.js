import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { classList, classCategories } from '../reducers/record'
import {
	toggleExpandFilters,
	launchCategoryFilter,
	launchAmountFilter,
	changeContent
} from '../actions'

import { bannerStyle, categoryStyle } from '../styles'

const Banner = ({
	expand, title, content, filter, classList, classCategories,
	categoryFilter, amountFilter, toggleExpandFilters, toHome
}) => {
	const expansion = expand && content == 'RECORD_LIST'?
		<table style={{width: '100%'}}><tbody><tr>
			<td style={categoryStyle}>
				<div><b>TIME</b>
					<div onClick={(e) => {}}>from</div>
					<div>{filter.time.from || '--'}</div>
					<div onClick={(e) => {}}>to</div>
					<div>{filter.time.to || '--'}</div>
				</div>
			</td>
			<td style={categoryStyle}>
				<div><b>AMOUNT</b>
					<div onClick={(e) => amountFilter(0)}>min</div>
					<div>{filter.amount.min || '--'}</div>
					<div onClick={(e) => amountFilter(1)}>max</div>
					<div>{filter.amount.max || '--'}</div>
				</div>
			</td>
			<td style={categoryStyle}>
				<div><b>CATEGORY</b>
					{classList.map( c => {
						return <div key={c.id}
							onClick={ (e) =>
								categoryFilter(c.name, classCategories[c.id])
							}>
							{c.name}
						</div>
					})}
				</div>
			</td>
		</tr></tbody></table>
		: <span />
	
	return <div style={{
			...bannerStyle,
			height: expand? 600:300
		}}>
		<h3 onClick={(e) => toHome()}>{title}</h3>
		{content == 'RECORD_LIST'?
			<h5 onClick={(e) => toggleExpandFilters()}>filters</h5>
			: <span></span>
		}
		{expansion}
	</div>
}

export default connect(
	({ ui, filter, record }) => ({
		...ui.banner,
		content: ui.content,
		classList: classList(record.classes),
		classCategories: classCategories(record),
		filter
	}),
	dispatch => ({
		categoryFilter: (className, categoryList) => dispatch(launchCategoryFilter({
			categoryList: categoryList,
			title: 'filter '+className+' category' 
		})),
		amountFilter: (type) => dispatch(launchAmountFilter({
			title: type == 0? 'MIN AMOUNT': 'MAX AMOUNT',
			type: type
		})),
		toggleExpandFilters: () => dispatch(toggleExpandFilters()),
		toHome: () => dispatch( changeContent('HOME'))
	})
)(Banner)
