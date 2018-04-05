import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import { syncFromFile as testGAPI } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordListPage from './RecordListPage'
import HomePage from './HomePage'
import OtherMenuPage from './OtherMenuPage'

const ContentPage = ({ modal, testGAPI }) => {
    return <div style={{
    	filter: modal?'brightness(300%) blur(10px)': '',
        textAlign: 'center',
        paddingTop: '300px'
    }}>

        <Route exact path="/" component={HomePage}/>
        <Route path="/new" component={NewRecordPage} />
        <Route path="/list" component={RecordListPage} />
        <Route path="/other" component={OtherMenuPage} />
    </div>
}

export default withRouter(connect(
	({ ui }) => ({ modal: ui.modal }),
    dispatch => ({
        testGAPI: (name) => dispatch(testGAPI(name))
    })
)(ContentPage))
