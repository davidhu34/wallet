import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Route, IndexRoute, withRouter } from 'react-router'

import WalletIcon from 'react-icons/lib/ti/book'
import FilterIcon from 'react-icons/lib/ti/filter'
import TimeIcon from 'react-icons/lib/md/today'
import MoneyIcon from 'react-icons/lib/md/attach-money'
import TagIcon from 'react-icons/lib/ti/tags'



import { classList, classCategories } from '../reducers/record'
import { bannerStyle, categoryStyle } from '../styles'
import {
	toggleExpandFilters,
	launchCategoryFilter,
	launchMaxAmountFilter,
	launchMinAmountFilter,
	launchFromTimeFilter,
	launchToTimeFilter,
	changeContent
} from '../actions'

const timeStr = ms =>  {
	if (ms) {
		const date = new Date(ms)
		return date.getFullYear()+' '+(date.getMonth()+1)+' '+date.getDate()
	} else return '--'
}

const bannerFilter = ({
	classList, classCategories, ui, filter,
	toggleExpandFilters,
	categoryFilter, maxAmountFilter, minAmountFilter, fromTimeFilter, toTimeFilter
}) => {

	const { expand } = ui.banner

	const filterExpansion = expand? <table style={{width: '100%'}}><tbody><tr>

		<td style={categoryStyle}>
			<div>

				<h5><MoneyIcon /></h5>

				<div onClick={(e) => minAmountFilter(filter.amount.min)}>min</div>
				<div>{filter.amount.min || '--'}</div>

				<div onClick={(e) => maxAmountFilter(filter.amount.max)}>max</div>
				<div>{filter.amount.max || '--'}</div>

			</div>
		</td>

		<td style={categoryStyle}>
			<div>
				<h5><TagIcon /></h5>
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

		<td style={categoryStyle}>
			<div>

				<h5><TimeIcon /></h5>

				<div onClick={(e) => fromTimeFilter(filter.time.from)}>from</div>
				<div>{timeStr(filter.time.from)}</div>

				<div onClick={(e) => toTimeFilter(filter.time.to)}>to</div>
				<div>{timeStr(filter.time.to)}</div>

			</div>
		</td>

	</tr></tbody></table> : <div />

	return <div>
		<h5 onClick={(e) => toggleExpandFilters()}>
			<FilterIcon />
		</h5>
		{filterExpansion}
	</div>
}
const BannerFilter = connect(

	({ ui, filter, record }) => ({
		classList: classList(record.classes),
		classCategories: classCategories(record),
		ui,
		filter
	}),
	dispatch => ({
		categoryFilter: (className, categoryList) => dispatch(launchCategoryFilter({
			categoryList: categoryList,
			title: 'filter '+className+' category'
		})),
		maxAmountFilter: (amount) => dispatch(launchMaxAmountFilter({number: amount})),
		minAmountFilter: (amount) => dispatch(launchMinAmountFilter({number: amount})),
		fromTimeFilter: (time) => dispatch(launchFromTimeFilter({
            title: 'FILTER FROM DATE',
            focusTimes: [time],
            viewTime: time,
            limit: 1
        })),
		toTimeFilter: (time) => dispatch(launchToTimeFilter({
            title: 'FILTER TO DATE',
            focusTimes: [time],
            viewTime: time,
            limit: 1
        })),
		toggleExpandFilters: () => dispatch(toggleExpandFilters())
	})
)(bannerFilter)


const BannerHead = toHome => (props) => (
	<h3 onClick={(e) => toHome()}>
		<WalletIcon />
	</h3>
)
const BannerHeadDefault = toHome => (props) => (
	<div>{BannerHead(toHome)}</div>
)
const BannerHeadHome = (props) => <div>
	<h3>
		<WalletIcon />WAllet
	</h3>
</div>

const BannerHeadList = toHome => (props) => (
	<div>
		{BannerHead(toHome)}
		<BannerFilter />
	</div>
)
const Banner = ({
	ui,
	toHome
}) => {
	const { content, modal, banner } = ui
	const { expand, title } = banner


	return <div style={{
			...bannerStyle,
			height: expand? 800:300
		}}>
		{ content != 'HOME'?
			<h3 onClick={(e) => toHome()}>
				<WalletIcon />
			</h3>
			:
			<div className="container">
				<br />
				<div className="row">
					<div className="three columns" style={{ color: 'transparent' }}>{'-'}</div>
					<div className="one column">
						<h2>
							<WalletIcon />
						</h2>
					</div>
					<div className="one column" style={{ color: 'transparent' }}>{'-'}</div>
					<div className="three columns"
						style={{fontSize:'3.6rem'}}>
						WALLET
					</div>

					<div className="four columns" style={{ color: 'transparent' }}>{'-'}</div>
				</div>
			</div>
		}
		<Route path="/list" component={BannerFilter}/>

	</div>
}

export default withRouter(connect(
	({ ui }) => ({
		ui
	}),
	dispatch => ({
		toHome: () => dispatch( changeContent('HOME'))
	})
)(Banner))
