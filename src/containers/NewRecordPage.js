import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import BackIcon from 'react-icons/lib/io/ios-arrow-left'
// import ResetIcon from 'react-icons/lib/io/ios-reload'
import CheckIcon from 'react-icons/lib/io/ios-checkmark-empty'
// import BackIcon from 'react-icons/lib/md/chevron-left'
import ResetIcon from 'react-icons/lib/md/refresh'
// import CheckIcon from 'react-icons/lib/ti/input-checked'

import {
    launchInputAmount,
    launchClassSelection,
    launchCategorySelection,
    launchDatepickerSelection,
    launchInputDesc,
    saveRecord,
    resetNewRecord,
    recordBack
} from '../actions'
import { classSelections, categorySelections } from '../reducers/record'
import { monthNames } from '../consts'


const NewRecordPage = ({
	newRecord, classes, categories,
    selectTime,
    inputDesc,
    inputAmount,
    selectClass,
    selectCategory
}) => {
	const { /*year, month, date,*/ amount, desc, time, classId, categoryId } = newRecord
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
        <div className="row" onClick={ (e) => inputDesc(desc) }>
        	<h6><b>DESC</b></h6>
        	<div>{desc}</div>
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
    back, reset, save
}) => {
    return <div className="row">

        <div className="one-third column" >

            <h1 onClick={(e) => { back() }}>
                <BackIcon  />
            </h1>

        </div>
        <div className="one-third column">

            <h1 onClick={(e) => { reset() }}>
                <ResetIcon />
            </h1>

        </div>
        <div className="one-third column">

            <h1 onClick={ (e) => save() }>
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
        save: () => dispatch(saveRecord()),
        reset: () => dispatch(resetNewRecord()),
        back: () => dispatch(recordBack())
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
        inputDesc: (desc) => dispatch(launchInputDesc({ title: 'INPUT DESC', text: desc })),
		inputAmount: (amount) => dispatch(launchInputAmount({ title: 'INPUT AMOUNT', number: amount }))
	})
)(NewRecordPage)
