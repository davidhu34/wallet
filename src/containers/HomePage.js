import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

// import OtherIcon from 'react-icons/lib/io/ios-more'
// import ListIcon from 'react-icons/lib/io/ios-paper-outline'
// import PenIcon from 'react-icons/lib/io/ios-compose-outline'
import OtherIcon from 'react-icons/lib/io/ios-more'
import ListIcon from 'react-icons/lib/ti/document-text'
import PenIcon from 'react-icons/lib/ti/pen'


import { filterRecords } from '../reducers/record'
import { recordFilters } from '../reducers/filter'
import { launchSelection, changeContent, launchDatepicker } from '../actions'

import NewRecordPage from './NewRecordPage'
import RecordList from '../components/RecordList'
import RecordListPage from './RecordListPage'

const HomePage = ({
    changeContent
}) => {
    return <div className="container">
        <h1>YO</h1>
    </div>

}
const homeFooter = ({
    changeContent
}) => {
    return <div className="row">
        <div className="one-third column" >

            <h1 onClick={(e) => { changeContent('OTHER_MENU') }}>
                <OtherIcon />
            </h1>

        </div>
        <div className="one-third column">

            <h2 onClick={(e) => { changeContent('RECORD_LIST') }}>
                <ListIcon />
            </h2>

        </div>
        <div className="one-third column">

            <h2 onClick={(e) => { changeContent('NEW_RECORD') }}>
                <PenIcon />
            </h2>

        </div>
    </div>
}
export const HomeFooter = connect(
	state => ({}),
	dispatch => ({
        changeContent: (content) => dispatch(changeContent(content))
	})
)(homeFooter)

export default connect(
	state => ({}),
    dispatch => ({
        changeContent: (content) => dispatch( changeContent(content))
    })
)(HomePage)
