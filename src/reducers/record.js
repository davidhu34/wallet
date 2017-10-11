import moment from 'moment'

import { recordInit } from '../consts'

let tempCount = 3

export const record = (state = recordInit, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export const filterRecords = (filters, records) => {
    const { min, max, categories } = filters
    return (!min || !max || !categories)? records
        : records.filter( r => {
        return !(
            //categories.indexOf(r.category) == -1 ||
            r.exchange > max || r.exchange < min
        )
    })
}