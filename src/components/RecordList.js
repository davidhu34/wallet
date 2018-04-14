import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Scrollbars } from 'react-custom-scrollbars'

import Record from './Record'

class RecordList extends Component {
	displayList (records) {
		return records
	}
	render () {
		const { records } = this.props
		return <div>
			<table style={{ width: '100%' }}><tbody>
			{
				this.displayList(records).map( r => {
					return <Record key={r.id} record={r} />
				})
			}
			</tbody></table>
		</div>
	}
}
export default RecordList
/*
<div className="RecordList"
	ref="scroll"
	style={{
			width: '100%',
			height: '300px',
			float: 'left',
			overflowY: 'scroll'
	}}>*/
