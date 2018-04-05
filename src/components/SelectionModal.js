import React, { Component, PropTypes } from 'react'
import { selectionStyle, footerStyle } from '../styles'

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
                onClick={ (e) => resolve(s.id) }>
                {s.data || s}
                <br />
            </div>
        )
    )
    return <div className="container">
        <br />
        <h5>{title}</h5>
        <br />
        {options}
        <div className="container"
            style={footerStyle}>

            <div className="row">
                <div className="twelve columns" onClick={ (e) => resolve(null) }>
                    <h5>CANCEL</h5>
                </div>
            </div>

        </div>
    </div>
}

export default SelectionModal
