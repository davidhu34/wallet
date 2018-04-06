import ppp from 'papaparse'
import md5 from 'md5'

import { recordInit } from '../consts'

let tempCount = 3

const records = (state, action) => {
    switch (action.type) {

        case 'CREATE_RECORD':
            const newRecord = action.record
            const id = md5(JSON.stringify(newRecord))
            return {
                ...state,
                [id]: {
                    ...newRecord,
                    id: id
                }
            }

        default:
            return state
    }
}
export const record = (state = recordInit, action) => {
    switch (action.type) {

        case 'CREATE_RECORD':
            return {
                ...state,
                records: records(state.records, action)
            }

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

export const formatNewRecord = (newRecord) => ({
    time: newRecord.time,
    class: newRecord.classId,
    category: newRecord.categoryId,
    amount: newRecord.amount,
    desc: newRecord.desc
})


export const recordsToCSV = (records) => {
    return ppp.unparse({
        fields: ['id','time','amount','class','category','desc'],
        data: Object.keys(records).map( id => {
            const r = records[id]
            return [
                r.id,
                r.time,
                r.amount,
                r.class,
                r.category,
                r.desc
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
        category: d.category?
            record.categories[d.category].name
            : record.classes[d.class].name,
        amount: d.amount,
        desc: d.desc
    }))
}
const thisMonday = () => {
	const today = new Date()
	const weekDay = today.getDay()
	const diff = weekDay? weekDay: 7
	return new Date(today.getFullYear(), today.getMonth(), today.getDate()-diff)
}
const thisMonth = () => {
	const today = new Date()
	return new Date(today.getFullYear(), today.getMonth(), 1)
}
const recordsFromTime = (record, fromTime) => {
	const { records } = record
	return Object.keys(records)
		.map( r => records[r] )
		.filter( r => r.time >= fromTime )
}
export const weekRecords = (record) => recordsFromTime(record, thisMonday())
export const monthRecords = (record) => recordsFromTime(record, thisFirstOfMonth())

export const mapCategoryRecords = (records) => {
	let categoryRecords = {}
	Object.keys(records)
		.map( r => {
			const ctg = records[r].category
			if (categoryRecords[ctg]) {
				categoryRecords[ctg].push(r)
			} else {
				categoryRecords[ctg] = [r]
			}
		})
	return categoryRecords
}
export const mapClassRecords = (records) => {
	let classRecords = {}
	Object.keys(records)
		.map( r => {
			const cl = records[r].class
			if (classRecords[cl]) {
				classRecords[cl].push(r)
			} else {
				classRecords[cl] = [r]
			}
		})
	return classRecords
}

export const topAmountRecords = (records, k) => {
	return Object.keys(records)
		.map( r => records[r] )
		.sort( (a,b) => b.amount - a.amount )
		.slice(0, k)
}
export const topCountClass = (cRecords, k) => {
	let classes
	return Object.keys(cRecords)
		.map( c => ({
			...classes[c],
			length: cRecords[c].length
		}))
		.sort( (a,b) => a.length - b.length )
		.slice(0, k)
}
export const topCountCategory = (cRecords, k) => {
	let categories
	return Object.keys(cRecords)
		.map( c => ({
			...categories[c],
			length: cRecords[c].length
		}))
		.sort( (a,b) => a.length - b.length )
		.slice(0, k)
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
