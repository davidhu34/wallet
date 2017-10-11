import moment from 'moment'

import { recordInit } from '../consts'

let tempCount = 3

export const record = (state = recordInit, action) => {
    switch (action.type) {
        case 'CREATE_RECORD':
            return state
        default:
            return state
    }
}

export const filterRecords = (filters, record) => {
    console.log(filters)
    const { min, max, from, to, categories } = filters
    const { records } = record
    const recordList = Object.keys(records).map( r => records[r] )

    const steps = []
    if (min) steps.push( (r) => r.exchange < min )
    if (max) steps.push( (r) => r.exchange > max )
    if ( categories.length > 0 )
        steps.push( (r) => categories.indexOf(r.category) == -1 )
    
    return steps.length > 0?
        recordList.filter( r => {
            for (let i = 0; i < steps.length; i++)
                if (steps[i](r)) return false
            return true
        }) : recordList
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
