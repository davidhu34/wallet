import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {
    launchTimeSelection,
    launchInputAmount,
    launchClassSelection,
    launchCategorySelection,
    launchInputDesc,
    createRecord,
    changeContent
} from '../actions'
import { classSelections, categorySelections } from '../reducers/record'


const NewRecordPage = ({
	newRecord, classes, categories,
	selectYear, selectMonth, selectDate, selectClass, selectCategory,
    inputAmount, inputDesc, createRecord, back
}) => {
	const { year, month, date, amount, desc, classId, categoryId } = newRecord
    const nrClass = classId? classes[classId].name: '--'
    const nrCateory = categoryId? categories[categoryId].name: '--'
    
    return <div>
        <div >
        	<b>TIME</b>
            <div onClick={ (e) => selectYear() }>{year}</div>
            <div onClick={ (e) => selectMonth() }>{month}</div>
            <div onClick={ (e) => selectDate() }>{date}</div>
        </div>
        <br />
        <div onClick={ (e) => inputDesc() }>
        	<b>DESCRIPTION</b>
        	<div>{desc}</div>
        </div>
        <br />
        <div onClick={ (e) => inputAmount() }>
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
		selectYear: () => dispatch(launchTimeSelection('year')),
		selectMonth: () => dispatch(launchTimeSelection('month')),
		selectDate: () => dispatch(launchTimeSelection('date')),
        selectClass: (classes) => dispatch(launchClassSelection({
            classList: classSelections(classes)
        })),
        selectCategory: (categories, classId) => dispatch(launchCategorySelection({
            categoryList: categorySelections(categories, classId)
        })),
        inputDesc: () => dispatch(launchInputDesc({ title: 'INPUT DESCRIPTION' })),
		inputAmount: () => dispatch(launchInputAmount({ title: 'INPUT AMOUNT'})),
        createRecord: (record) => dispatch(createRecord(record)),
        back: () => dispatch(changeContent('HOME'))
	})
)(NewRecordPage)
