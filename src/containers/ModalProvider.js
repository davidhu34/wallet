import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import RecordList from '../components/RecordList'
import SelectionModal from '../components/SelectionModal'
import FilterModal from '../components/FilterModal'
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
            case 'filter':
                return <Modal>
                    <FilterModal resolve={resolve}
                        filterType={data.type}
                        options={data.list} />
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
