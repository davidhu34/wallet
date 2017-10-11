import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {
    launchTimeSelection,
    launchInputAmount,
    launchClassSelection,
    launchCategorySelection,
    launchInputDesc
} from '../actions'

const NewRecordPage = ({
	newRecord, classes, categories,
	selectYear, selectMonth, selectDate, selectClass, selectCategory, inputAmount, inputDesc
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
            classList: Object.keys(classes)
                .map( c => ({
                    id: c,
                    data: classes[c].name
                }))
        })),
        selectCategory: (categories, classId) => dispatch(launchCategorySelection({
            categoryList: Object.keys(categories)
                .filter( c => categories[c].class == classId )
                .map( c => ({
                    id: c,
                    data: categories[c].name
                }))
                
        })),
        inputDesc: () => dispatch(launchInputDesc({ title: 'INPUT DESCRIPTION' })),
		inputAmount: () => dispatch(launchInputAmount({ title: 'INPUT AMOUNT'}))
	})
)(NewRecordPage)
