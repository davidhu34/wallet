import React, { Component } from 'react'
import { connect } from 'react-redux'

import BackIcon from 'react-icons/lib/md/chevron-left'

import { changeContent } from '../actions'

const DefaultFooter = ({ toHome }) => (
    <div className="row">

        <div className="one-third column" >
            <h1 onClick={(e) => { toHome() }}>
                <BackIcon />
            </h1>
        </div>

        <div className="one-third column" />
        <div className="one-third column" />
    </div>
)

export default connect(
	state => ({}),
    dispatch => ({
        toHome: (content) => dispatch( changeContent('HOME'))
    })
)(DefaultFooter)
