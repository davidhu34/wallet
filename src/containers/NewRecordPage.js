import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {
    launchInputAmount,
    launchClassSelection,
    launchCategorySelection,
    launchDatepickerSelection,
    launchInputNote,
    createRecord,
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
        	<b>TIME</b>
            <div onClick={ (e) => selectTime(nrTime.getTime()) }>{year +' '+ (month+1) +' '+ date}</div>

        </div>
        <br />
        <div onClick={ (e) => inputNote(note) }>
        	<b>NOTE</b>
        	<div>{note}</div>
        </div>
        <br />
        <div onClick={ (e) => inputAmount(amount) }>
        	<b>AMOUNT</b>
        	<div>{amount}</div>
        </div>
        <br />
        <div onClick={ (e) => selectClass(classes) }>
            <b>CLASS</b>
            <div>{ nrClass }</div>
        </div>
        <br />
        <div onClick={ (e) => classId? selectCategory(categories, classId): {} }>
            <b>CATEGORY</b>
            <div>{ nrCateory }</div>
        </div>
        <br />
        <div onClick={ (e) => createRecord(newRecord) }>CREATE</div>
        <div onClick={ (e) => back() }>CANCEL</div>

    </div>

}

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
		inputAmount: (amount) => dispatch(launchInputAmount({ title: 'INPUT AMOUNT', number: amount })),
        createRecord: (record) => dispatch(createRecord(record)),
        back: () => dispatch(changeContent('HOME'))
	})
)(NewRecordPage)
