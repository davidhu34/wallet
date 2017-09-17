import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

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
        console.log(records)
        return <div className="RecordList"
            ref="scroll"
            style={{
                width: '100%',
                height: 'auto',
                overflowY: 'scroll',
            }}>
            <table style={{ width: '100%' }}><tbody>
            {
                this.displayList(records).map( r => {
                    return <Record key={r.id}
                        record={r} />
                })
            }
            </tbody></table>
        </div>
    }
}
export default RecordList