import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { footerStyle } from '../styles'
import { toggleCategoryFilter } from '../actions'

const CategoryFilterModal = ({
    resolve, title, categoryList,
    selecting,
    toggleFilter
}) => {

    const filters = categoryList.map( (c, idx) => {
            const categoryName = c.name
            return <div style={{
                    padding: '1rem',
                    display: 'inline-block'
                }}
                onClick={(e) => toggleFilter(c.id)} >
                { selecting.indexOf(c.id) > -1?
                    <b>{c.name}</b>
                    : <span>{c.name}</span>
                }
            </div>
        })

    return <div className="container">
        <br />
        <h5>{title}</h5>

        <br />
        <br />
        {filters}

        <div className="container"
            style={footerStyle}>

            <div className="row">
                <div className="six columns" onClick={ (e) => resolve(false) }>
                    <h5>CANCEL</h5>
                </div>
                <div className="six columns" onClick={ (e) => resolve(true) }>
                    <h5>APPLY</h5>
                </div>
            </div>

        </div>
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
