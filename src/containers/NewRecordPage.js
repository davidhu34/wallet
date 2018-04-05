import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import BackIcon from 'react-icons/lib/md/chevron-left'
import ResetIcon from 'react-icons/lib/md/refresh'
import CheckIcon from 'react-icons/lib/ti/input-checked'

import {
    launchInputAmount,
    launchClassSelection,
    launchCategorySelection,
    launchDatepickerSelection,
    launchInputNote,
    createRecord,
    resetNewRecord,
    changeContent
} from '../actions'
import { classSelections, categorySelections } from '../reducers/record'
import { monthNames } from '../consts'


const NewRecordPage = ({
	newRecord, classes, categories,
    selectTime, selectClass, selectCategory,
    inputAmount, inputNote, createRecord, back
}) => {
	const { /*year, month, date,*/ amount, note, time, classId, categoryId } = newRecord
    const nrClass = classId? classes[classId].name: '--'
    const nrCateory = categoryId? categories[categoryId].name: '--'

    const nrTime = new Date(time)
    const year = nrTime.getFullYear()
    const month = nrTime.getMonth()
    const date = nrTime.getDate()


    return <div>
        <div >
        	<h6><b>TIME</b></h6>
            <div className="row" onClick={ (e) => selectTime(nrTime.getTime()) }>{year +' '+ (month+1) +' '+ date}</div>

        </div>
        <br />
        <div className="row" onClick={ (e) => inputNote(note) }>
        	<h6><b>NOTE</b></h6>
        	<div>{note}</div>
        </div>
        <br />
        <div className="row" onClick={ (e) => inputAmount(amount) }>
        	<h6><b>AMOUNT</b></h6>
        	<div>{amount}</div>
        </div>
        <br />
        <div className="row" onClick={ (e) => selectClass(classes) }>
            <h6><b>CLASS</b></h6>
            <div>{ nrClass }</div>
        </div>
        <br />
        <div className="row" onClick={ (e) => classId? selectCategory(categories, classId): {} }>
            <h6><b>CATEGORY</b></h6>
            <div>{ nrCateory }</div>
        </div>

    </div>

}

const newRecordFooter = ({
    newRecord,
    back, resetRecord, createRecord
}) => {
    return <div className="row">

        <div className="one-third column" >

            <h1 onClick={(e) => { back() }}>
                <BackIcon  />
            </h1>

        </div>
        <div className="one-third column">

            <h1 onClick={(e) => { resetRecord() }}>
                <ResetIcon />
            </h1>

        </div>
        <div className="one-third column">

            <h1 onClick={ (e) => createRecord(newRecord) }>
                <CheckIcon />
            </h1>

        </div>
    </div>
}
export const NewRecordFooter = connect(
	({ newRecord }) => ({
        newRecord
	}),
	dispatch => ({
        createRecord: (record) => dispatch(createRecord(record)),
        resetRecord: () => dispatch(resetNewRecord()),
        back: () => dispatch(changeContent('HOME'))
	})
)(newRecordFooter)

export default connect(
	({ newRecord, record }) => ({
		newRecord,
        classes: record.classes,
        categories: record.categories
	}),
	dispatch => ({
        selectTime: (time) => dispatch(launchDatepickerSelection({
            title: 'SELECT RECORD DATE',
            focusTimes: [time],
            viewTime: time,
            limit: 1
        })),
        selectClass: (classes) => dispatch(launchClassSelection({
            classList: classSelections(classes)
        })),
        selectCategory: (categories, classId) => dispatch(launchCategorySelection({
            categoryList: categorySelections(categories, classId)
        })),
        inputNote: (note) => dispatch(launchInputNote({ title: 'INPUT NOTE', text: note })),
		inputAmount: (amount) => dispatch(launchInputAmount({ title: 'INPUT AMOUNT', number: amount }))
	})
)(NewRecordPage)
