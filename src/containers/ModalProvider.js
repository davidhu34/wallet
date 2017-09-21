import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import RecordList from '../components/RecordList'
import SelectionModal from '../components/SelectionModal'
import Modal from '../components/Modal'
import { launchModal } from '../actions'

const ModalProvider = ({
    open,
    util, data, resolve
}) => {
    console.log(open);
    if (open) {
        switch (util) {
            case 'selection':
                return <Modal>
                    <SelectionModal resolve={resolve}
                        selections={data.list}
                        size={data.size} />
                </Modal>
            default:
                return <span />
        }
    } else return <span />

}

export default connect(
    ({ ui, modal }) => {
        console.log(modal);
        return {...modal, open: ui.modal}
    }
)(ModalProvider)
