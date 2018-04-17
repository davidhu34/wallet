import React, { Component } from 'react'
import { connect } from 'react-redux'

import CategoryFilterModal from '../containers/CategoryFilterModal'
import NumberPadModal from '../containers/NumberPadModal'
import DatepickerModal from '../containers/DatepickerModal'

import Modal from '../components/Modal'
import SelectionModal from '../components/SelectionModal'
import LoaderModal from '../components/LoaderModal'
import TextInputModal from '../components/TextInputModal'
import AlertModal from '../components/AlertModal'
import ConfirmModal from '../components/ConfirmModal'

import { launchModal } from '../actions'

const ModalProvider = ({
    open, modalType, data, resolve
}) => {
    if (open) {
        switch (modalType) {
            case 'text':
                return <Modal>
                    <TextInputModal resolve={resolve}
                        title={data.title}
                        defaultText={data.text}/>
                </Modal>
            case 'alert':
                return <Modal>
                    <AlertModal resolve={resolve}
                        title={data.title}
                        message={data.message} />
                </Modal>
            case 'confirm':
                return <Modal>
                    <ConfirmModal resolve={resolve}
                        title={data.title}
                        message={data.message} />
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
            case 'loader':
                return <Modal>
                    <LoaderModal />
                </Modal>
            default:
                return <span />
        }
    } else return <span />

}

export default connect(
    ({ ui, modal }) => ({ ...modal, open: ui.modal })
)(ModalProvider)
