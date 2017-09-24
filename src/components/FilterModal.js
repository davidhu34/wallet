import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { closeModal, toggleFilter } from '../actions'

const FilterModal = ({
    resolve, options, filterType,
    filter,
    toggleFilter
}) => {

    const size = 1

    const filters = options.map( (o, idx) => {
        return <div style={{
                display: 'inline-block'
            }}
            onClick={(e) => toggleFilter(o)} >
            { filter[filterType].selecting
                .indexOf(o) > -1?
                    <b>{o}</b>: <span>{o}</span>
            }
        </div>
    })
    return <div>
        {filters}
        <br />
        <div onClick={ (e) => resolve(true) }>APPLY</div>
        <div onClick={ (e) => resolve(false) }>CANCEL</div>
    </div>
}

export default connect(
    state => ({filter: state.filter}),
    dispatch => ({
        toggleFilter: (filter) => dispatch(toggleFilter(filter))
    })
)(FilterModal)
