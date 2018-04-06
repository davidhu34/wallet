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
    console.log(records)
	return Object.keys(records)
		.map( r => records[r] )
		.filter( r => r.time >= fromTime )
}
const weekRecordList = (record) => recordsFromTime(record, thisMonday())
const monthRecordList = (record) => recordsFromTime(record, thisFirstOfMonth())

const mapCategoryRecords = (records, key = 'category') => {
	let categoryRecords = {}
	Object.keys(records)
		.map( r => {
			const ctg = records[r][key]
            if (ctg) {
    			if (categoryRecords[ctg]) {
    				categoryRecords[ctg].push(r)
    			} else {
    				categoryRecords[ctg] = [r]
    			}
            }
		})
	return categoryRecords
}
const mapCategoryRecordList = (recordList, key = 'category') => {
	let categoryRecordList = {}
	recordList.map( (r, idx) => {
		const ctg = recordList[idx][key]
        if (ctg) {
			if (categoryRecordList[ctg]) {
				categoryRecordList[ctg].push(idx)
			} else {
				categoryRecordList[ctg] = [idx]
			}
        }
	})
	return categoryRecordList
}
const mapClassRecords = (records) => mapCategoryRecords(records, 'class')
const mapClassRecordList = (records) => mapCategoryRecordList(records, 'class')

const topAmountOfRecordList = (recordList, k) => {
    return recordList.sort( (a,b) => b.amount - a.amount ).slice(0, k)
}
const topAmountOfRecords = (records, k) => {
	return topAmountOfRecordList(
        Object.keys(records).map( r => records[r] ),
        k
	)
}

export const topCountOfClassRecords = (cRecords, k) => {
	let classes
	return Object.keys(cRecords)
		.map( c => ({
			...classes[c],
			length: cRecords[c].length
		}))
		.sort( (a,b) => a.length - b.length )
		.slice(0, k)
}

export const topCountOfCategoryRecords = (cRecords, k) => {
	let categories
	return Object.keys(cRecords)
		.map( c => ({
			...categories[c],
			length: cRecords[c].length
		}))
		.sort( (a,b) => a.length - b.length )
		.slice(0, k)
}
export const getTotal = (recordList) => {
    let total = 0
    recordList.map( r => { total += r.amount })
    return total
}
const arraySum = (array) => {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
        sum += array[i]
    }
    return sum
}
export const getOverviewRecordList = (overview, record) => {
    const getRecordList = [weekRecordList, monthRecordList]
    return getRecordList[overview.totalType](record)
}
export const getTopCategory = (overview, recordList) => {
    const { topCategoryType } = overview
    console.log(recordList, overview)
    const categoryRecordList = mapCategoryRecordList(recordList)
    const getTopCategoryList = [
        () => {
            let categorySumList = []
            Object.keys(categoryRecordList)
                .map( ctg => {
                    categorySumList.push({
                        category: ctg,
                        sum: arraySum(
                            categoryRecordList[ctg].map( idx => recordList[idx].amount )
                        )
                    })
                })
            return categorySumList.sort( (a,b) => b.sum - a.sum ).slice(0,3)
        },
        () => {
            let categoryCountList = []
            Object.keys(categoryRecordList)
                .map( ctg => {
                    categorySList.push({
                        category: ctg,
                        count: categoryRecordList[ctg].length
                    })
                })
            return categoryCountList.sort( (a,b) => b.count - a.count ).slice(0,3)
        }
    ]
    return getTopCategoryList[topCategoryType]()

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
