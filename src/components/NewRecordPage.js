import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { launchTimeSelection, launchInputAmount } from '../actions'

const NewRecordPage = ({
	newRecord,
	selectYear, selectMonth, selectDate, inputAmount
}) => {
	const { year, month, date, amount } = newRecord
    return <div>
        <div >
        	<b>TIME</b>
            <div onClick={ (e) => selectYear() }>{year}</div>
            <div onClick={ (e) => selectMonth() }>{month}</div>
            <div onClick={ (e) => selectDate() }>{date}</div>
        </div>
        <br />
        <div>
        	<b>DESCRIPTION</b>
        	
        </div>
        <br />
        <div>
        	<b>AMOUNT</b>
        	<div onClick={ (e) => inputAmount()}>{amount}</div>
        </div>

    </div>

}

export default connect(
	({ newRecord }) => ({
		newRecord
	}),
	dispatch => ({
		selectYear: () => dispatch(launchTimeSelection('year')),
		selectMonth: () => dispatch(launchTimeSelection('month')),
		selectDate: () => dispatch(launchTimeSelection('date')),
		inputAmount: () => dispatch(launchInputAmount({ title: 'INPUT AMOUNT'}))
	})
)(NewRecordPage)
