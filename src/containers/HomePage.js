import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

// import OtherIcon from 'react-icons/lib/io/ios-more'
// import ListIcon from 'react-icons/lib/io/ios-paper-outline'
// import PenIcon from 'react-icons/lib/io/ios-compose-outline'
import OtherIcon from 'react-icons/lib/io/ios-more'
import ListIcon from 'react-icons/lib/ti/document-text'
import PenIcon from 'react-icons/lib/ti/pen'

import MoneyIcon from 'react-icons/lib/md/attach-money'
import TagIcon from 'react-icons/lib/ti/tag'
import DoubleTagIcon from 'react-icons/lib/ti/tags'

import { filterRecords, getOverview } from '../reducers/record'
import { recordFilters } from '../reducers/filter'
import { selectTotalType, selectTopType, selectTopCategoryType, changeContent } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordList from '../components/RecordList'
import RecordListPage from './RecordListPage'
import BlankColumn from '../components/BlankColumn'

const HomePage = ({
	totalType, total, topType, topCategoryType, topCategoryList,
	selectTotalType, selectTopType, selectTopCategoryType, changeContent
}) => {
	return <div className="container">
		<br />

		<div className="row">
			<BlankColumn size={3} />

			<div className="three columns">
				<h6 onClick={(e) => selectTotalType(0)}>
					{ totalType == 0 ?
						<b>{'this week'}</b> : 'this week'
					}
				</h6>
			</div>
			<div className="three columns">
				<h6 onClick={(e) => selectTotalType(1)}>
					{ totalType == 1 ?
						<b>{'this month'}</b> : 'this month'
					}
				</h6>
			</div>

			<BlankColumn size={3} />
		</div>
		<h1>{total+' $'}</h1>

		<br />

		<div className="row">
			<BlankColumn size={1} />

			<div className="six columns">
				<h5>Top Expenses</h5>
			</div>
			<div className="two columns">
				<h5 onClick={(e) => selectTopCategoryType(0)}>
					{ topCategoryType == 0 ?
						<b><TagIcon /></b> : <TagIcon />
					}
				</h5>
			</div>
			<div className="two columns">
				<h5 onClick={(e) => selectTopCategoryType(1)}>
					{ topCategoryType == 1 ?
						<b><DoubleTagIcon /></b> : <DoubleTagIcon />
					}
				</h5>
			</div>

			<BlankColumn size={1} />
		</div>
		<div className="row">
			<BlankColumn size={3} />

			<div className="three columns">
				<h6 onClick={(e) => selectTopType(0)}>
					{ topType == 0 ?
						<b>{'by sum'}</b> : 'by sum'
					}
				</h6>
			</div>
			<div className="three columns">
				<h6 onClick={(e) => selectTopType(1)}>
					{ topType == 1 ?
						<b>{'by amount'}</b> : 'by amount'
					}
				</h6>
			</div>

			<BlankColumn size={3} />
		</div>
		{
			topCategoryList.map( (ctg, i) => {
				console.log('topCategoryList',i, ctg)
				return <div className="row" key={i}>
					<BlankColumn size={2} />
					<div className="four columns">
						<h6>{ ctg.category.name }</h6>
					</div>
					<div className="four columns">
						<h6>{ ctg[['sum','count'][topType]] }</h6>
					</div>
					<BlankColumn size={2} />
				</div>
			})
		}
	</div>

}

export default connect(
	({ ui, record }) => {
		const overview = ui.overview
		const { total, topCategoryList } = getOverview(overview, record)
		return {
			...overview,
			total,
			topCategoryList
		}

	},
	dispatch => ({
		selectTotalType: (type) => dispatch( selectTotalType(type) ),
		selectTopType: (type) => dispatch( selectTopType(type) ),
		selectTopCategoryType: (type) => dispatch( selectTopCategoryType(type) ),
		changeContent: (content) => dispatch( changeContent(content))
	})
)(HomePage)


const homeFooter = ({
	changeContent
}) => {
	return <div className="row">
		<div className="one-third column">

			<h1 onClick={(e) => { changeContent('OTHER_MENU') }}>
				<OtherIcon />
			</h1>

		</div>
		<div className="one-third column">

			<h2 onClick={(e) => { changeContent('RECORD_LIST') }}>
				<ListIcon />
			</h2>

		</div>
		<div className="one-third column">

			<h2 onClick={(e) => { changeContent('NEW_RECORD') }}>
				<PenIcon />
			</h2>

		</div>
	</div>
}
export const HomeFooter = connect(
	state => ({}),
	dispatch => ({
		changeContent: (content) => dispatch(changeContent(content))
	})
)(homeFooter)
