import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewRecordPage from '../components/NewRecordPage'
import RecordList from '../components/RecordList'
import { filterRecords } from '../reducers/record'
import { recordFilters } from '../reducers/filter'
import { launchSelection, changeContent, launchDatepicker } from '../actions'

const ContentPage = ({
    records, modal, content, newRecord,
    launchSelection, changeContent, launchDatepicker
}) => {
    const recordListProps = { records }
    const form = Object.keys(newRecord).map(k => {
        return <div onClick={ (e) => launchSelection(k) }>
            {newRecord[k]}
        </div>
    })
    let main
    switch (content) {
        case 'NEW_RECORD':
            main = <NewRecordPage />
            break;
        case 'RECORD_LIST':
            main = <RecordList {...recordListProps} />
            break;
        case 'HOME':
        default:
            main = <div className="container">
                <h4 onClick={(e) => { changeContent('RECORD_LIST') }}>
                    Record List
                </h4>
                <h4 onClick={(e) => { changeContent('NEW_RECORD') }}>
                    New Record
                </h4>
            </div>
            break;
    }
    return <div style={{
    	filter: modal?'brightness(300%) blur(10px)': '',
        textAlign: 'center',
        paddingTop: '500px'
    }}>
		{main}
    </div>

}

export default connect(
	({ record, ui, newRecord, filter }) => ({
        newRecord: newRecord,
        modal: ui.modal,
        content: ui.content,
        records: filterRecords(recordFilters(filter), record)
    }),
    dispatch => ({
        launchDatepicker: (data) => dispatch( launchDatepicker(data) ),
        launchSelection: (k) => dispatch( launchSelection(k) ),
        changeContent: (content) => dispatch( changeContent(content))
    })
)(ContentPage)
