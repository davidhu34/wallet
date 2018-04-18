import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import { syncFromFile as testGAPI } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordListPage from './RecordListPage'
import HomePage from './HomePage'
import OtherMenuPage from './OtherMenuPage'


const ContentPage = ({ modal, testGAPI }) => {
    const base = process.env.PUBLIC_URL || ''
    console.log(process.env, base)
    return <div style={{
    	filter: modal?'brightness(300%) blur(10px)': '',
    	WebkitFilter: modal?'brightness(300%) blur(10px)': '',
        height: '100%',
        paddingTop: '300px',
        paddingBottom: '100px',
        textAlign: 'center'
    }}>

        <Route exact path={base+'/'} component={HomePage}/>
        <Route path={base+'/new'} component={NewRecordPage} />
        <Route path={base+'/edit'} component={NewRecordPage} />
        <Route path={base+'/list'} component={RecordListPage} />
        <Route path={base+'/other'} component={OtherMenuPage} />
    </div>
}

export default withRouter(connect(
	({ ui }) => ({ modal: ui.modal }),
    dispatch => ({
        testGAPI: (name) => dispatch(testGAPI(name))
    })
)(ContentPage))
