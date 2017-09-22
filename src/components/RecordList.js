import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Scrollbars } from 'react-custom-scrollbars'


import Record from './Record'

class RecordList extends Component {
		scrollToBottom () {
				const node = this.refs.scroll
				node.scrollTop = node.scrollHeight
		}
		displayList (records) {
				return records
		}
		componentDidMount () {
				this.scrollToBottom();
		}
		componentDidUpdate () {
				this.scrollToBottom();
		}
		render () {
				const { records } = this.props
				console.log(this.props)
				return <Scrollbars
					style={{
						width: '100%',
						height: 600
					}}>
					<span ref="scroll">
						<table style={{ width: '100%' }}><tbody>
						{
								this.displayList(records).map( r => {
										return <Record key={r.id}
												record={r} />
								})
						}
						</tbody></table>
					</span>
				</Scrollbars>
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