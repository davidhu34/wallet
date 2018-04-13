import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const Record = ({ record }) => {

    return <tr>
        <td>{moment(record.time).format('MM/DD')}</td>
        <td>{record.desc}</td>
        <td>{record.category}</td>
        <td>{record.amount}</td>
    </tr>

}

export default Record
