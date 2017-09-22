import React, { Component } from 'react'
import { connect } from 'react-redux'

import RecordList from '../components/RecordList'
import { launchSelection } from '../actions'

const ContentPage = ({
    records, modal, newRecord,
    launchSelection
}) => {
    const recordListProps = { records }
    const form = Object.keys(newRecord).map(k => {
        return <div onClick={ (e) => launchSelection(k) }>
            {newRecord[k]}
        </div>
    })

    return <div style={{
    	filter: modal?'brightness(300%) blur(10px)': ''
    }}>
		<RecordList {...recordListProps} />
        {form}
    </div>

}

export default connect(
	({ record, ui, newRecord }) => ({
        newRecord: newRecord,
        modal: ui.modal,
        records: Object.keys(record.records)
            .map( r => record.records[r])
    }),
    dispatch => ({
        launchSelection: (k) => dispatch( launchSelection(k) )
    })
)(ContentPage)
