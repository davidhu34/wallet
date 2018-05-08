import md5 from 'md5'
import ppp from 'papaparse'

import { recordInit } from '../consts'
import filter, { recordFilters } from './filter'
import { recordIdListFromTimeSpan } from './recordUtils'
export * from './recordUtils'

const classes = (state, action) => {
	switch (action.type) {

		case 'CREATE_RECORD':
			const cl = action.record.class
			return {
				...state,
				[cl]: {
					...state[cl],
					timeline: action.timeline[cl]
				}
			}

		case 'UPDATE_RECORD':
		case 'GAPI_SYNC_END':
			let newState = { ...state }
			Object.keys(action.timeline).map( cl => {
				newState[cl].timeline = action.timeline[cl]
			})
			return newState

		default:
			return state
	}
}
const categories = (state, action) => {
	switch (action.type) {

		case 'CREATE_RECORD':
			const ctg = action.record.category
			return {
				...state,
				[ctg]: {
					...state[ctg],
					timeline: action.timeline[action.record.category]
				}
			}

		case 'UPDATE_RECORD':
		case 'GAPI_SYNC_END':
			let newState = { ...state }
			Object.keys(action.timeline).map( ctg => {
				newState[ctg].timeline = action.timeline[ctg]
			})
			return newState

		default:
			return state
	}
}
const records = (state, action) => {
	switch (action.type) {

		case'UPDATE_RECORD':
			const record = action.record
			return {
				...state,
				[record.id]: record
			}
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

		case 'GAPI_SYNC_END':
			return recordsFromCSV(action.data)

		default:
			return state
	}
}
export const record = (state = recordInit, action) => {
	const newFilter = filter(state.filter, action)
	switch (action.type) {
		case 'APPLY_FROM_TIME_FILTER':
        case 'APPLY_TO_TIME_FILTER':
        case 'CLEAR_TIME_FILTER':
        case 'TOGGLE_CATEGORY_FILTER':
        case 'TOGGLE_ALL_CATEGORY_FILTER':
        case 'APPLY_CATEGORY_FILTER':
        case 'CLEAR_CATEGORY_FILTER':
        case 'APPLY_MIN_FILTER':
        case 'APPLY_MAX_FILTER':
        case 'CLEAR_AMOUNT_FILTER':
        case '@@router/LOCATION_CHANGE':
			return {
				...state,
				filter: newFilter,
				filteredList: filterRecords(newFilter, state)
			}
		case 'LOAD_DEMO_DATA':
			let demoState = genDemoData()
			return {
				...demoState,
				filter: newFilter,
				filteredList: filterRecords(newFilter, demoState)
			}
		case 'UPDATE_RECORD':
			const newTimeline = resortTimeline(state, action.record)
			let newState = {
				...state,
				timeline: newTimeline,
				records: records(state.records, action)
			}
			const { classTimeline, categoryTimeline } = genCCTimeline(newState, newTimeline)
			newState.classes = classes(state.classes, {
				...action,
				timeline: classTimeline
			})
			newState.categories = categories(state.categories, {
				...action,
				timeline: categoryTimeline
			})

			newState.filteredList = filterRecords(newFilter, newState)
			return newState

		case 'CREATE_RECORD':
		case 'GAPI_SYNC_END':
			if (action.error) {
				return {
					...state,
					filter: newFilter
				}
			} else {
				let newState = {
					...state,
					records: records(state.records, action)
				}
				const { timeline, classTimeline, categoryTimeline } = genTimeline(newState)
				newState.classes = classes(state.classes, {
				...action,
				timeline: classTimeline
				})
				newState.categories = categories(state.categories, {
					...action,
					timeline: categoryTimeline
				})
				newState.timeline = timeline

				newState.filteredList = filterRecords(newFilter, newState)
				return newState
			}

		default:
			return state
	}
}

const filterRecords = (filter, record) => {
	const filters = recordFilters(filter)
	const { min, max, from, to, categories } = filters
	const { records, filteredList } = record

	const recordIdList = recordIdListFromTimeSpan(record, from, to)
	const steps = []
	// if (to) steps.push( (r) => r.time > to )
	// if (from) steps.push( (r) => r.time < from )
	if (min || max) steps.push( (r) => min && r.amount < min || max && r.amount > max )
	const ctgSet = new Set()
	if ( categories.length > 0 ) {
		categories.forEach( ctg => ctgSet.add(ctg) )
		steps.push( (r) => !ctgSet.has(r.category) )
	}

	const newFilteredList = steps.length > 0?
		recordIdList.filter( id => {
			const r = records[id]
			for (let i = 0; i < steps.length; i++)
				if (steps[i](r))
					return false
			return true
		}) : recordIdList

	return newFilteredList.map( id => {
		const r = records[id]
		return {
			...r,
			category: r.category? r.category: r.class,
			categoryName: r.category?
				record.categories[r.category].name
				: record.classes[r.class].name
		}
	})
}


const genCCTimeline = (record, timeline) => {
	const { records } = record
	const classTimeline = {}
	const categoryTimeline = {}
	Object.keys(record.classes).map( cl => { classTimeline[cl] = [] })
	Object.keys(record.categories).map( ctg => { categoryTimeline[ctg] = [] })

	timeline.map( id => {
		const r = records[id]
		classTimeline[r.class].push(id)
		if (r.category) categoryTimeline[r.category].push(id)
	})
	return { classTimeline, categoryTimeline }
}
const genTimeline = (record) => {
	const { records } = record
	const timeline = Object.keys(records).sort( (id1,id2) => records[id2].time - records[id1].time )
	
	return { timeline, ...genCCTimeline(record, timeline) }
}

const resortTimeline = (state, record) => {
	const { records, timeline } = state
	const { id, time } = record
	const order = timeline.indexOf(id)
	if (order < 0) return timeline
	else {
		if (records[id].time < time) {

			let appending = order+1
			let descend = appending
			while (descend < timeline.length) {
				if (records[descend].time <= time) break
				else descend++
			}

			return [
				...timeline.slice(0,appending),
				...timeline.slice(appending, descend),
				id,
				...timeline.slice(descend),
			]

		} else if (records[id].time > time) {

			let ascend = order
			while (ascend > 0) {
				if (records[ascend-1].time >= time) break
				else ascend--
			}
			return ascend? [
				...timeline.slice(0,ascend),
				id,
				...timeline.slice(ascend, order),
				...timeline.slice(order+1)
			] : [
				id,
				...timeline.slice(0,order),
				...timeline.slice(order+1)
			]

		} else return timeline
	}
}
const genDemoData = () => {
	const now = (new Date()).getTime()
	return {
		classes: {
			'1': {
				id: '1',
				name: 'food',
				category: ['1' ,'2', '3', '4'],
				timeline: ['1', '4', '7']
			},
			'2': {
				id: '2',
				name: 'travel',
				category: ['5' ,'6', '7'],
				timeline: ['2', '3', '5', '8', '9']
			}
		},
		categories: {
			'1': {
				id: '1',
				name: 'breakfast',
				class: '1',
				timeline: []
			},
			'2': {
				id: '2',
				name: 'lunch',
				class: '1',
				timeline: ['1']
			},
			'3': {
				id: '3',
				name: 'dinner',
				class: '1',
				timeline: ['4']
			},
			'4': {
				id: '4',
				name: 'drink',
				class: '1',
				timeline: ['7']
			},
			'5': {
				id: '5',
				name: 'mrt',
				class: '2',
				timeline: ['5','6']
			},
			'6': {
				id: '6',
				name: 'bus',
				class: '2',
				timeline: ['8','9']
			},
			'7': {
				id: '7',
				name: 'hsr',
				class: '2',
				timeline: ['2','3']
			}
		},
		records: {
			'1': {
				id: '1',
				time: now,
				class: '1',
				category: '2',
				amount: 100,
				desc: 'lunch'
			},
			'2': {
				id: '2',
				time: now,
				class: '2',
				category: '7',
				amount: 1200,
				desc: 'HSR to Kaohsiung'
			},
			'3': {
				id: '3',
				time: now,
				class: '2',
				category: '7',
				amount: 1200,
				desc: 'HSR to Taipei'
			},
			'4': {
				id: '4',
				time: now-86400000,
				class: '1',
				category: '3',
				amount: 9100,
				desc: 'dinner JSP'
			},
			'5': {
				id: '5',
				time: now-86400000,
				class: '2',
				category: '5',
				amount: 200,
				desc: 'MRT to work'
			},
			'6': {
				id: '6',
				time: now-86400000,
				class: '2',
				category: '5',
				amount: 200,
				desc: 'MRT to home'
			},
			'7': {
				id: '7',
				time: now-605000000,
				class: '1',
				category: '4',
				amount: 100,
				desc: 'comebuy'
			},
			'8': {
				id: '8',
				time: now-605000000,
				class: '2',
				category: '6',
				amount: 1200,
				desc: 'bus to school'
			},
			'9': {
				id: '9',
				time: now-605000000,
				class: '2',
				category: '6',
				amount: 1200,
				desc: 'bus home'
			}
		},
		timeline: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
	}
}
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
