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
import TagIcon from 'react-icons/lib/ti/tags'

import { filterRecords, getOverviewRecordList, getTotal, getTopCategory } from '../reducers/record'
import { recordFilters } from '../reducers/filter'
import { launchSelection, changeContent, launchDatepicker } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordList from '../components/RecordList'
import RecordListPage from './RecordListPage'

const HomePage = ({
    total, topCategories,
    changeContent
}) => {
    return <div className="container">
        <br />

        <div className="row">
            <div className="three columns" style={{ color: 'transparent' }}>{'-'}</div>
            <div className="three columns">
                <h6>this week</h6>
            </div>
            <div className="three columns">
                <h6>this month</h6>
            </div>
            <div className="three columns" style={{ color: 'transparent' }}>{'-'}</div>
        </div>
        <h1>{total+' $'}</h1>

        <br />

        <div className="row">
            <div className="one column" style={{ color: 'transparent' }}>{'-'}</div>
            <div className="six columns">
                <h5>Top Expenses</h5>
            </div>
            <div className="two columns">
                <h5><TagIcon /></h5>
            </div>
            <div className="two columns">
                <h5><MoneyIcon /></h5>
            </div>
            <div className="one column" style={{ color: 'transparent' }}>{'-'}</div>
        </div>
        <div className="row">
            <div className="two columns" style={{ color: 'transparent' }}>{'-'}</div>
            <div className="four columns">
                <h6>category</h6>
            </div>
            <div className="four columns">
                <h6>666</h6>
            </div>
            <div className="two columns" style={{ color: 'transparent' }}>{'-'}</div>
        </div>
    </div>

}
const homeFooter = ({
    changeContent
}) => {
    return <div className="row">
        <div className="one-third column" >

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

export default connect(
	({ ui, record }) => {
        const overview = ui.overview
        const overviewRecordList = getOverviewRecordList(overview, record)
        console.log(overview, overviewRecordList)
        return {
            ...overview,
            total: getTotal(overviewRecordList),
            topCategories: getTopCategory(overview, overviewRecordList)
        }

    },
    dispatch => ({
        changeContent: (content) => dispatch( changeContent(content))
    })
)(HomePage)
