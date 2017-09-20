import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import RecordList from '../components/RecordList'
import ModalProvider from '../containers/ModalProvider'
 import { launchModal } from '../actions'

const Wallet = ({
    records, modal,
    launchModal
}) => {
    const recordListProps = { records }

    return <div className="Wallet">
        <ModalProvider open={modal} />
        <RecordList {...recordListProps} />
        <div onClick={ (e) => launchModal() } >
            launch modal
        </div>
    </div>

}

export default connect(
    ({ record, ui }) => ({
        modal: ui.modal,
        records: Object.keys(record.records)
            .map( r => record.records[r])
    }),
    dispatch => ({
        launchModal: () => dispatch( launchModal() )
    })
)(Wallet)
