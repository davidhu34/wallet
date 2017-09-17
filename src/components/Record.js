import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const Record = ({ record }) => {

    return <tr>
        <td>{moment(record.time).format('HH:mm')}</td>
        <td>{record.note}</td>
        <td>{record.category}</td>
        <td>{record.exchange}</td>
    </tr>

}

export default Record
