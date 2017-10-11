import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { toggleCategoryFilter } from '../actions'

const CategoryFilterModal = ({
    resolve, title, categoryList,
    selecting,
    toggleFilter
}) => {

    const filters = categoryList.map( (c, idx) => {
            const categoryName = c.name
            return <div style={{
                    display: 'inline-block'
                }}
                onClick={(e) => toggleFilter(c.id)} >
                { selecting.indexOf(c.id) > -1?
                    <b>{c.name}</b>
                    : <span>{c.name}</span>
                }
            </div>
        })

    return <div>
        <strong>{title}</strong>
        <br />
        {filters}
        <br />
        <div onClick={ (e) => resolve(true) }>APPLY</div>
        <div onClick={ (e) => resolve(false) }>CANCEL</div>
    </div>
}

export default connect(
    ({ filter }) => ({
        selecting: filter.selecting.categories
    }),
    dispatch => ({
        toggleFilter: (category) => dispatch(toggleCategoryFilter(category))
    })
)(CategoryFilterModal)
