import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'
import { Scrollbars } from 'react-custom-scrollbars'

import RecordList from '../components/RecordList'
import { filterRecords } from '../reducers/record'
import { recordFilters } from '../reducers/filter'
import { launchSelection, changeContent, launchDatepicker } from '../actions'

class RecordListPage extends Component {
	scrollToBottom () {
		const node = this.refs.scroll
		node.scrollTop = node.scrollHeight
	}
	componentDidMount () {
		this.scrollToBottom();
	}
	componentDidUpdate () {
		this.scrollToBottom();

		console.log(this.props, findDOMNode(this).clientHeight)
	}
	render () {
		const { records } = this.props
		return <div style={{ width: '100%', height: 800 }}>
            <Scrollbars>
    			<span ref="scroll">
    				<RecordList records={records} />
    			</span>
    		</Scrollbars>
        </div>
	}
}

export default connect(
	({ record, filter }) => ({
        records: filterRecords(recordFilters(filter), record)
    }),
    dispatch => ({})
)(RecordListPage)
