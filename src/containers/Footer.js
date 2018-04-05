import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import BackIcon from 'react-icons/lib/md/chevron-left'
import OtherIcon from 'react-icons/lib/io/ios-more'
import ListIcon from 'react-icons/lib/ti/document-text'
import PenIcon from 'react-icons/lib/ti/pen'

import { routeContents } from '../consts'
import { launchSelection, changeContent, launchDatepicker } from '../actions'

import { NewRecordFooter } from './NewRecordPage'
import { HomeFooter } from './HomePage'

const Footer = ({
    path,
    toHome
}) => {
    let footer
    switch (routeContents[path]) {
        case 'HOME':
            footer = <HomeFooter />
            break
        case 'NEW_RECORD':
            footer = <NewRecordFooter />
            break
        default:
            footer = <div className="row">

                <div className="one-third column" >
                    <h1 onClick={(e) => { toHome() }}>
                        <BackIcon />
                    </h1>
                </div>

                <div className="one-third column" />
                <div className="one-third column" />
            </div>
            break
    }
    return <div className="container"
        style={{
            position:'fixed',
            bottom: 0,
            textAlign: 'center',
            verticalAlign: 'center'
        }}>
        {footer}
    </div>

}

export default connect(
	({ router }) => {
        const location = router.location  || {}
        const pathname = location.pathname || '/'
        return {
            path: pathname
        }
    },
    dispatch => ({
        toHome: (content) => dispatch( changeContent('HOME'))
    })
)(Footer)
