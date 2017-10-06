import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { launchTimeSelection } from '../actions'

const NewRecordPage = ({
	newRecord,
	selectYear, selectMonth, selectDate
}) => {
	const { year, month, date } = newRecord
    return <div>
        <div >
        	TIME
            <div onClick={ (e) => selectYear() }>{year}</div>
            <div onClick={ (e) => selectMonth() }>{month}</div>
            <div onClick={ (e) => selectDate() }>{date}</div>
        </div>
        <br />
        <div>
        	DESCRIPTION
        </div>
        <br />
        <div>
        	AMOUNT
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
		selectDate: () => dispatch(launchTimeSelection('date'))
	})
)(NewRecordPage)
