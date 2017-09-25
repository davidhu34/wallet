import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { toggleCategoryFilter } from '../actions'

const CategoryFilterModal = ({
    resolve, filterClass,
    filter,
    toggleFilter
}) => {

    const size = 1

    const filters = filter.class[filterClass]
        .category.map( (c, idx) => {
            return <div style={{
                    display: 'inline-block'
                }}
                onClick={(e) => toggleFilter(c)} >
                { filter.selecting['category']
                    .indexOf(c) > -1?
                        <b>{c.name}</b>: <span>{c.name}</span>
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
        toggleFilter: (category) => dispatch(toggleCategoryFilter(category))
    })
)(CategoryFilterModal)
