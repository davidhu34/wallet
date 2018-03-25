import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'
import NewRecordPage from './NewRecordPage'
import RecordList from '../components/RecordList'
import { filterRecords } from '../reducers/record'
import { recordFilters } from '../reducers/filter'
import { launchSelection, changeContent, launchDatepicker } from '../actions'

const RecordListPage = ({
    records
}) => {
    const recordListProps = { records }

    return <RecordList {...recordListProps} />

}

export default connect(
	({ record, filter }) => ({
        records: filterRecords(recordFilters(filter), record)
    }),
    dispatch => ({})
)(RecordListPage)
