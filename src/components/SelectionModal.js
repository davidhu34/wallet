import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { closeModal } from '../actions'

const SelectionModal = ({ selections, size, resolve, title }) => {
    let sels = selections
    let lines = []
    for (let i = 0; i < selections.length; i+=size) {
        lines.push( sels.slice(i, i+size) )
    }

    const options = lines.map( line =>
        <div className="container">
        <strong>{title}</strong>
        <br />
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
