import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const SelectModal = ({ selections }) => {
    const entries = selections.map( s => {
        return <tr><td>
            {s}
        </td></tr>
    })
    return <table><tbody>
        { entries }
    </tbody></table>

}

export default SelectModal
