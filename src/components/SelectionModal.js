import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { closeModal } from '../actions'

const SelectionModal = ({ selections, resolve }) => {
    const entries = selections.map( s => {
        return <tr onClick={(e) => {
            console.log(s)
            resolve(s)
        }}>
            <td>{s}</td>
        </tr>
    })
    return <table><tbody>
        { entries }
    </tbody></table>

}

export default SelectionModal
