import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { clickNumberPad, popNumberPad, clearNumberPad } from '../actions'
import { numberStyle, footerStyle } from '../styles'

const NumberPadModal = ({
    resolve, number, title,
    clickNumber, popNumber, clearNumber
}) => {

    return <div className="container">
        <br />
        <h5>{title}</h5>

        <div className="container"
            style={footerStyle}>
            <h1>{number}</h1>

            <br />
            <br />
            <br />

            { ['1','2','3','4','5','6','7','8','9'].map( n =>
                <div style={numberStyle}
                    onClick={(e) => clickNumber(n)}>
                    <h5>{n}</h5>
                </div>
            )}
            <div style={numberStyle} onClick={(e) => clearNumber()}>
                <h5>C</h5>
            </div>
            <div style={numberStyle}
                onClick={(e) => clickNumber(0)}>
                <h5>0</h5>
            </div>
            <div style={numberStyle} onClick={(e) => popNumber()}>
                <h5>DEL</h5>
            </div>

            <div className="row" />
            <br />
            <br />
            <br />

            <div className="row">
                <div className="six columns" onClick={ (e) => resolve(-1) }>
                    <h5>CANCEL</h5>
                </div>
                <div className="six columns" onClick={ (e) => resolve(number) }>
                    <h5>APPLY</h5>
                </div>
            </div>

        </div>
    </div>
}

export default connect(
    ({ numberPad }) => ({ ...numberPad }),
    dispatch => ({
        clickNumber: (number) => dispatch(clickNumberPad(number)),
        popNumber: () => dispatch(popNumberPad()),
        clearNumber: () => dispatch(clearNumberPad())
    })
)(NumberPadModal)
