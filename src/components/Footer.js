import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import BackIcon from 'react-icons/lib/md/chevron-left'
import OtherIcon from 'react-icons/lib/io/ios-more'
import ListIcon from 'react-icons/lib/ti/document-text'
import PenIcon from 'react-icons/lib/ti/pen'

import { footerStyle } from '../styles'
import { NewRecordFooter } from '../containers/NewRecordPage'
import { HomeFooter } from '../containers/HomePage'
import DefaultFooter from '../containers/DefaultFooter'

const Footer = ({ hide }) => {
    return <div style={footerStyle}>
    { hide? null
        : <div className="container">

            <Route exact path="/" component={HomeFooter}/>
            <Route path="/new" component={NewRecordFooter} />
            <Route path="/edit" component={NewRecordFooter} />
            <Route path="/list" component={DefaultFooter} />
            <Route path="/other" component={DefaultFooter} />
        </div>
    }
    </div>
}

export default withRouter(connect(
    ({ ui }) => ({
        hide: ui.modal
    })
)(Footer))
