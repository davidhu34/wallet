import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import RecordList from '../components/RecordList'
import SelectionModal from '../components/SelectionModal'
import Modal from '../components/Modal'
import { launchModal } from '../actions'

const ModalProvider = ({
    open,
    util, data, resolve,
    launchModal
}) => {
    console.log(util);
    if (open) {
        switch (util) {
            case 'selection':
                return <Modal>
                    <SelectionModal {...data} resolve={resolve} />
                </Modal>
            default:
                return <span />
        }
    } else return <span />

}

export default connect(
    ({ ui, modal }) => ({
        ...modal
    }),
    dispatch => ({
        launchModal: () => dispatch( launchModal() )
    })
)(ModalProvider)
