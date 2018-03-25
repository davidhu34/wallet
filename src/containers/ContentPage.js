import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'
import { filterRecords } from '../reducers/record'
import { recordFilters } from '../reducers/filter'
import { launchSelection, changeContent, launchDatepicker } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordList from '../components/RecordList'
import RecordListPage from './RecordListPage'
import HomePage from './HomePage'

const ContentPage = ({ modal }) => {
    return <div style={{
    	filter: modal?'brightness(300%) blur(10px)': '',
        textAlign: 'center',
        paddingTop: '500px'
    }}>
        <Route exact path="/" component={HomePage}/>
        <Route path="/new" component={NewRecordPage} />
        <Route path="/list" component={RecordListPage} />
    </div>
}

export default withRouter(connect(
	({ ui }) => ({ modal: ui.modal })
)(ContentPage))
