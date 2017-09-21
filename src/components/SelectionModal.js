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
    }
    console.log(lines, String(100/7)+'%')

    const options = lines.map( line => 
        <div className="container">
        { line.map( s =>
            <div style={{
                    textAlign: 'center',
                    padding: 'auto',
                    display:'inline-block',
                    width: String(100/size)+'%'
                }}
                onClick={ (e) => {
                    console.log(s)
                    resolve(s)
                }}>
                {s}
            </div>
        )}
        </div>
    )
    return <div>
        {options}
    </div>
}

export default SelectionModal
