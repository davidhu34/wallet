import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { closeModal } from '../actions'

const sizeMap = ['twelve', 'one-half', 'one-third',
    'one-fourth', 'one-fifth', 'one-sixth',
    'one-seventh', 'one-eighth', 'one-ninth',
    'one-tenth', 'one-eleventh', 'one']
const SelectionModal = ({ selections, size, resolve }) => {
    let sels = selections
    let lines = []
    for (let i = 0; i < selections.length; i+=size) {
        lines.push( sels.slice(i, i+size) )
    } if (sels.length) lines.push( sels )
    console.log(lines)

    const options = lines.map( line => 
        <div className="row">
        { line.map( s =>
            <div className={ sizeMap[size-1]+" column" }>{s}</div>)}
        }
        </div>
    )

    const entries = selections.map( s => {
        return <tr onClick={(e) => {
            console.log(s)
            resolve(s)
        }}>
            <td>{s}</td>
        </tr>
    })
    return <div>
    {options}
    <table><tbody>
        
        { entries }
    </tbody></table>
</div>
}

export default SelectionModal
