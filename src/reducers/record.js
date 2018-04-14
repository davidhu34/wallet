import md5 from 'md5'
import ppp from 'papaparse'

import { recordInit } from '../consts'
export * from './recordUtils'

const classes = (state, action) => {
	switch (action.type) {
		case 'CREATE_RECORD':
			return {
				...state,
				[action.record.class]: {
					...state[action.record.class],
					timeline: action.timeline[action.record.class]
				}
			}
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
			return {
				...state,
				[action.record.category]: {
					...state[action.record.category],
					timeline: action.timeline[action.record.category]
				}
			}
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
	switch (action.type) {

		case 'LOAD_DEMO_DATA':
			return genDemoData()

		case 'CREATE_RECORD':
		case 'GAPI_SYNC_END':
			if (action.error) {
				return state
			} else {
				let newState = {
					...state,
					records: records(state.records, action)
				}
				const { timeline, classTimeline, categoryTimeline } = genTimeline(newState)
				return {
					...newState,
					classes: classes(state.classes, {
						...action,
						timeline: classTimeline
					}),
					categories: categories(state.categories, {
						...action,
						timeline: categoryTimeline
					}),
					timeline: timeline
				}
			}

		default:
			return state
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

const genTimeline = (record) => {
	const { records } = record
	const timeline = Object.keys(records).sort( (id1,id2) => records[id2].time - records[id1].time )
	const classTimeline = {}
	const categoryTimeline = {}
	Object.keys(record.classes).map( cl => { classTimeline[cl] = [] })
	Object.keys(record.categories).map( ctg => { categoryTimeline[ctg] = [] })

	timeline.map( id => {
		const r = records[id]
		classTimeline[r.class].push(id)
		if (r.category) categoryTimeline[r.category].push(id)
	})

	return { timeline, classTimeline, categoryTimeline }
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
