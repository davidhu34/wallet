import ppp from 'papaparse'

import { recordInit } from '../consts'

let tempCount = 3

export const record = (state = recordInit, action) => {
    switch (action.type) {

        case 'CREATE_RECORD':
            return state

        case 'GAPI_SYNC_END':
            return action.error? state
                : {
                    ...state,
                    records: recordsFromCSV(action.data)
                }
                
        default:
            return state
    }
}

export const recordsToCSV = (records) => {
    return ppp.unparse({
        fields: ['id','time','amount','class','category','note'],
        data: Object.keys(records).map( id => {
            const r = records[id]
            return [
                r.id,
                r.time,
                r.amount,
                r.class,
                r.category,
                r.note
            ]
        })
    })
}

export const recordsFromCSV = (csv) => {
    const parsed = ppp.parse(csv, { header: true })
    const recordArray = parsed.data || []
    let newRecords = {}
    recordArray.map( r => {
        if (r.id) newRecords[r.id] = r
    })
    return newRecords
}

export const filterRecords = (filters, record) => {
    console.log(filters)
    const { min, max, from, to, categories } = filters
    const { records } = record
    const recordList = Object.keys(records).map( r => records[r] )

    const steps = []
    if (to) steps.push( (r) => r.time > to )
    if (from) steps.push( (r) => r.time < from )
    if (min) steps.push( (r) => r.amount < min )
    if (max) steps.push( (r) => r.amount > max )
    if ( categories.length > 0 )
        steps.push( (r) => categories.indexOf(r.category) == -1 )

    const data = steps.length > 0?
        recordList.filter( r => {
            for (let i = 0; i < steps.length; i++)
                if (steps[i](r)) return false
            return true
        }) : recordList

    return data.map( d => ({
        time: d.time,
        //class: record.classes[d.class].name,
        category: record.categories[d.category].name,
        amount: d.amount,
        note: d.note
    }))
}

export const classList = classes => Object.keys(classes).map( c => classes[c] )
export const categoryList = categories => categories.map( c => categories[c] )
export const classCategories = record => {
    const { classes, categories } = record
    let cc = {}
    Object.keys(classes).forEach( cl => { console.log(cl);cc[cl] = [] })
    Object.keys(categories).forEach( ct => {
        cc[categories[ct].class].push(categories[ct])
    })
    return cc
}

export const classSelections = classes =>
    Object.keys(classes).map( c => ({
        id: c,
        data: classes[c].name
    }))
export const categorySelections = (categories, classId) =>
    Object.keys(categories)
        .filter( c => categories[c].class == classId )
        .map( c => ({
            id: c,
            data: categories[c].name
        }))
