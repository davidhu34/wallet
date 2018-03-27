import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'
import { testGAPI } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordList from '../components/RecordList'
import RecordListPage from './RecordListPage'
import HomePage from './HomePage'

const ContentPage = ({ modal, testGAPI }) => {
    return <div style={{
    	filter: modal?'brightness(300%) blur(10px)': '',
        textAlign: 'center',
        paddingTop: '500px'
    }}>
        <div onClick={ (e) => {
            testGAPI()
        }}>test gapi</div>
        <Route exact path="/" component={HomePage}/>
        <Route path="/new" component={NewRecordPage} />
        <Route path="/list" component={RecordListPage} />
    </div>
}

export default withRouter(connect(
	({ ui }) => ({ modal: ui.modal }),
    dispatch => ({
        testGAPI: () => dispatch(testGAPI())
    })
)(ContentPage))
