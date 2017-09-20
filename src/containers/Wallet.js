import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import RecordList from '../components/RecordList'
import Modal from '../components/Modal'
import SelectModal from '../components/SelectModal'
import { launchModal } from '../actions'

const Wallet = ({
    records, modal,
    launchModal
}) => {
    const recordListProps = { records }
    const selections = ['January', 'February', 'March'];

    const toLaunch = modal? <Modal color="rgba(0,0,0,0.8)">
        <SelectModal selections={selections} />
    </Modal>:null
    return <div className="Wallet">
        {toLaunch}
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
