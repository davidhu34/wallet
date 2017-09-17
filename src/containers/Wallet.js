import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import RecordList from '../components/RecordList'

const Wallet = ({
    records
}) => {
    const recordListProps = { records }
    console.log(records)
    return <div className="Wallet">
        <RecordList {...recordListProps} />
    </div>

}

export default connect(
    ({ record }) => ({
        records: Object.keys(record.records)
            .map( r => record.records[r])
    })
)(Wallet)
