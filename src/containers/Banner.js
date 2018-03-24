import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { classList, classCategories } from '../reducers/record'
import {
	toggleExpandFilters,
	launchCategoryFilter,
	launchMaxAmountFilter,
	launchMinAmountFilter,
	changeContent
} from '../actions'

import { bannerStyle, categoryStyle } from '../styles'

const Banner = ({
	classList, classCategories, ui, filter,
	categoryFilter, maxAmountFilter, minAmountFilter, toggleExpandFilters, toHome
}) => {
	const { content, modal, banner } = ui;
	const { expand, title } = ui.banner;

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
					<div onClick={(e) => minAmountFilter(filter.amount.min)}>min</div>
					<div>{filter.amount.min || '--'}</div>
					<div onClick={(e) => maxAmountFilter(filter.amount.max)}>max</div>
					<div>{filter.amount.max || '--'}</div>
				</div>
			</td>
			<td style={categoryStyle}>
				<div><b>CATEGORY</b>
				{classList.map( c =>
					<div key={c.id}
						onClick={ (e) =>
							categoryFilter(c.name, classCategories[c.id])
						}>
						{c.name}
					</div>
				)}
				</div>
			</td>
		</tr></tbody></table>
		: <span />

	return <div style={{
			...bannerStyle,
			height: expand? 600:300
		}}>
		<h3 onClick={(e) => toHome()}>{title}</h3>
		<div style={{ filter: modal?'brightness(300%) blur(10px)': '' }}>
			{content == 'RECORD_LIST'?
				<h5 onClick={(e) => toggleExpandFilters()}>filters</h5>
				: <span></span>
			}
			{expansion}
		</div>
	</div>
}

export default connect(
	({ ui, filter, record }) => ({
		classList: classList(record.classes),
		classCategories: classCategories(record),
		ui, filter
	}),
	dispatch => ({
		categoryFilter: (className, categoryList) => dispatch(launchCategoryFilter({
			categoryList: categoryList,
			title: 'filter '+className+' category'
		})),
		maxAmountFilter: (amount) => dispatch(launchMaxAmountFilter({number: amount})),
		minAmountFilter: (amount) => dispatch(launchMinAmountFilter({number: amount})),
		toggleExpandFilters: () => dispatch(toggleExpandFilters()),
		toHome: () => dispatch( changeContent('HOME'))
	})
)(Banner)
