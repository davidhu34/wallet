import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Route, IndexRoute, withRouter } from 'react-router'


import WalletIcon from 'react-icons/lib/ti/book'
import FilterIcon from 'react-icons/lib/ti/filter'
import MoneyIcon from 'react-icons/lib/md/attach-money'
// import TimeIcon from 'react-icons/lib/io/ios-calendar'
// import TagIcon from 'react-icons/lib/io/ios-pricetags'
import TimeIcon from 'react-icons/lib/md/today'
import TagIcon from 'react-icons/lib/ti/tags'



import { classList, classCategories } from '../reducers/record'
import { bannerStyle, categoryStyle } from '../styles'
import {
	toggleExpandFilters,
	launchCategoryFilter,
	clearCategoryFilter,
	launchMaxAmountFilter,
	launchMinAmountFilter,
	clearAmountFilter,
	launchFromTimeFilter,
	launchToTimeFilter,
	clearTimeFilter,
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
	categoryFilter, clearCategoryFilter,
	maxAmountFilter, minAmountFilter, clearAmountFilter,
	fromTimeFilter, toTimeFilter, clearTimeFilter
}) => {

	const { expand } = ui.banner
	let filteredClass = []
	console.log(filter.categories)

	const filterExpansion = expand? <table style={{width: '100%'}}><tbody><tr>

		<td style={categoryStyle}>
			<div>

				<h5><MoneyIcon /></h5>

				<div onClick={(e) => minAmountFilter(filter.amount.min)}>min</div>
				<div>{filter.amount.min || '--'}</div>

				<div onClick={(e) => maxAmountFilter(filter.amount.max)}>max</div>
				<div>{filter.amount.max || '--'}</div>

				<br />
				<div onClick={(e) => clearAmountFilter()}>clear</div>
			</div>
		</td>

		<td style={categoryStyle}>
			<div>
				<h5><TagIcon /></h5>
				{
					classList.map( cl => {
						const classCtgs = classCategories[cl.id]
						let bold = false
						for (let i = 0; i < classCtgs.length; i++) {
							if (filter.categories.indexOf(classCtgs[i].id) > -1) {
								bold = true
								break
							}
						}
						return <div key={cl.id}
							onClick={(e) => categoryFilter(cl.name, classCtgs)}>
							{ bold? <b>{cl.name}</b>: cl.name }
						</div>
					})
				}

				<br />
				<div onClick={(e) => clearCategoryFilter()}>clear</div>
			</div>
		</td>

		<td style={categoryStyle}>
			<div>

				<h5><TimeIcon /></h5>

				<div onClick={(e) => fromTimeFilter(filter.time.from)}>from</div>
				<div>{timeStr(filter.time.from)}</div>

				<div onClick={(e) => toTimeFilter(filter.time.to)}>to</div>
				<div>{timeStr(filter.time.to)}</div>

				<br />
				<div onClick={(e) => clearTimeFilter()}>clear</div>
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
		clearCategoryFilter: () => dispatch(clearCategoryFilter()),
		maxAmountFilter: (amount) => dispatch(launchMaxAmountFilter({number: amount})),
		minAmountFilter: (amount) => dispatch(launchMinAmountFilter({number: amount})),
		clearAmountFilter: () => dispatch(clearAmountFilter()),
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
		clearTimeFilter: () => dispatch(clearTimeFilter()),
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
			height: expand? '100%':300
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
		{ modal? null : <Route path="/list" component={BannerFilter}/> }

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
