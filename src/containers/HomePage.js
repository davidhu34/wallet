import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'
import { filterRecords } from '../reducers/record'
import { recordFilters } from '../reducers/filter'
import { launchSelection, changeContent, launchDatepicker } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordList from '../components/RecordList'
import RecordListPage from './RecordListPage'

const HomePage = ({
    changeContent
}) => {
    return <div className="container">
        <h4 onClick={(e) => { changeContent('RECORD_LIST') }}>
            Record List
        </h4>
        <h4 onClick={(e) => { changeContent('NEW_RECORD') }}>
            New Record
        </h4>
    </div>

}

export default connect(
	state => ({}),
    dispatch => ({
        changeContent: (content) => dispatch( changeContent(content))
    })
)(HomePage)
