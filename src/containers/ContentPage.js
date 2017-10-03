import React, { Component } from 'react'
import { connect } from 'react-redux'

import RecordList from '../components/RecordList'
import { filterRecords } from '../reducers/record'
import { launchSelection, changeContent } from '../actions'

const ContentPage = ({
    records, modal, content, newRecord,
    launchSelection, changeContent
}) => {
    const recordListProps = { records }
    const form = Object.keys(newRecord).map(k => {
        return <div onClick={ (e) => launchSelection(k) }>
            {newRecord[k]}
        </div>
    })
    let main
    switch(content) {
        case 'NEW_RECORD':
            main = <div>{form}</div>
            break;
        case 'RECORD_LIST':
            main = <RecordList {...recordListProps} />
            break;
        case 'HOME':
        default:
            main = <div className="container" style={{ paddingTop: '500px'}}>
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
        textAlign: 'center'
    }}>
		{main}
    </div>

}

export default connect(
	({ record, ui, newRecord, filter }) => ({
        newRecord: newRecord,
        modal: ui.modal,
        content: ui.content,
        records: filterRecords(
            {
                categories: filter.selected.category,
                max: filter.selected.amount.max,
                min: filter.selected.amount.min
            },
            Object.keys(record.records).map( r => record.records[r])
        )
    }),
    dispatch => ({
        launchSelection: (k) => dispatch( launchSelection(k) ),
        changeContent: (content) => dispatch( changeContent(content))
    })
)(ContentPage)
