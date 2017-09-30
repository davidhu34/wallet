import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { clickNumberPad, popNumberPad } from '../actions'

const numberStyle = {
    textAlign: 'center',
    padding: 'auto',
    display:'inline-block',
    width: String(100/3)+'%'
}
const NumberPadModal = ({
    resolve, number,
    clickNumber, popNumber
}) => {

    return <div>
        <h1>{number}</h1>
        <div className="container">
            { ['1','2','3','4','5','6','7','8','9'].map( n =>
                <div style={numberStyle}
                    onClick={(e) => clickNumber(n)}>
                    {n}
                </div>
            )}
            <div style={{...numberStyle, width: String(200/3)+'%'}}
                onClick={(e) => clickNumber(0)}>
                0
            </div>
            <div style={numberStyle} onClick={(e) => popNumber()}>
                DEL
            </div>
        </div>
        <br />
        <div onClick={ (e) => resolve(number) }>APPLY</div>
        <div onClick={ (e) => resolve(number) }>CANCEL</div>
    </div>
}

export default connect(
    ({ numberPad }) => ({ ...numberPad }),
    dispatch => ({
        clickNumber: (number) => dispatch(clickNumberPad(number)),
        popNumber: () => dispatch(popNumberPad())
    })
)(NumberPadModal)
