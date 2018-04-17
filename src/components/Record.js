import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const Record = ({ record, onRecordClick }) => {

    return <tr onClick={(e) => {
    	console.log(record, e, onRecordClick)
    	onRecordClick(record)
    }}>
        <td>{moment(Number(record.time)).format('MM/DD')}</td>
        <td>{record.desc}</td>
        <td>{record.categoryName}</td>
        <td>{record.amount}</td>
    </tr>

}

export default Record
