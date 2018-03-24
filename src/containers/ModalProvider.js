import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import RecordList from '../components/RecordList'
import SelectionModal from '../components/SelectionModal'
import CategoryFilterModal from '../components/CategoryFilterModal'
import NumberPadModal from '../components/NumberPadModal'
import TextInputModal from '../components/TextInputModal'
import DatepickerModal from '../components/DatepickerModal'
import Modal from '../components/Modal'
import { launchModal } from '../actions'

const ModalProvider = ({
    open, modalType, data, resolve
}) => {
    console.log(open);
    if (open) {
        switch (modalType) {
            case 'text':
                return <Modal>
                    <TextInputModal resolve={resolve}
                        title={data.title}
                        defaultText={data.text}/>
                </Modal>
            case 'numberPad':
                return <Modal>
                    <NumberPadModal resolve={resolve}
                        title={data.title} />
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
            case 'datepicker':
                return <Modal>
                    <DatepickerModal resolve={resolve}
                        limit={data.limit}
                        title={data.title} />
                </Modal>
            default:
                return <span />
        }
    } else return <span />

}

export default connect(
    ({ ui, modal }) => ({...modal, open: ui.modal})
)(ModalProvider)
