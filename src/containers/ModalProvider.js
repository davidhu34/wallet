import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import RecordList from '../components/RecordList'
import SelectionModal from '../components/SelectionModal'
import CategoryFilterModal from '../components/CategoryFilterModal'
import NumberPadModal from '../components/NumberPadModal'
import Modal from '../components/Modal'
import { launchModal } from '../actions'

const ModalProvider = ({
    open, util, data, resolve
}) => {
    console.log(open);
    if (open) {
        switch (util) {
            case 'text':
            case 'numberPad':
                return <Modal>
                    <NumberPadModal resolve={resolve} title={data.title} />
                </Modal>
            case 'selection':
                return <Modal>
                    <SelectionModal resolve={resolve}
                        title={data.title}
                        selections={data.list}
                        size={data.size} />
                </Modal>
            case 'category_filter':
                return <Modal>
                    <CategoryFilterModal resolve={resolve}
                        title={data.title}
                        categoryList={data.categoryList} />
                </Modal>
            default:
                return <span />
        }
    } else return <span />

}

export default connect(
    ({ ui, modal }) => ({...modal, open: ui.modal})
)(ModalProvider)
