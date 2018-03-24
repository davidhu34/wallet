import React, { Component, PropTypes } from 'react'
import { selectionStyle } from '../styles'

const SelectionModal = ({ selections, size, resolve, title }) => {
    let sels = selections
    let lines = []
    for (let i = 0; i < selections.length; i+=size) {
        lines.push( sels.slice(i, i+size) )
    }

    const options = lines.map( line =>

        line.map( s =>
            <div style={{
                    ...selectionStyle,
                    width: String(100/size)+'%'
                }}
                onClick={ (e) => resolve(s) }>
                {s.data || s}
                <br />
            </div>
        )
    )
    return <div className="container">
        <strong>{title}</strong>
        <br />
        {options}
        <div onClick={ (e) => resolve(null)}>CANCEL</div>
    </div>
}

export default SelectionModal
