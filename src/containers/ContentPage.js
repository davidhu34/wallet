import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import { syncFromFile as testGAPI } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordListPage from './RecordListPage'
import HomePage from './HomePage'
import OtherMenuPage from './OtherMenuPage'

const ContentPage = ({ modal, testGAPI }) => {
    
    const base = process.env.PUBLIC_URL
    console.log(base)
    return <div style={{
    	filter: modal?'brightness(300%) blur(10px)': '',
    	WebkitFilter: modal?'brightness(300%) blur(10px)': '',
        height: '100%',
        paddingTop: '300px',
        paddingBottom: '100px',
        textAlign: 'center'
    }}>

        <Route exact path="/wallet/" component={HomePage}/>
        <Route path="/wallet/new" component={NewRecordPage} />
        <Route path="/wallet/edit" component={NewRecordPage} />
        <Route path="/wallet/list" component={RecordListPage} />
        <Route path="/wallet/other" component={OtherMenuPage} />
    </div>
}

export default withRouter(connect(
	({ ui }) => ({ modal: ui.modal }),
    dispatch => ({
        testGAPI: (name) => dispatch(testGAPI(name))
    })
)(ContentPage))
