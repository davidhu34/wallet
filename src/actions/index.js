import { TIME_CONSTS, recordInit } from '../consts'

const classData = recordInit.class

const missionDirectivesPrep = {
	'NEW_RECORD_NOTE': (data) => ({
		modalType: 'text',
		preClose: (value) => ({
			type: 'NEW_RECORD_NOTE',
			text: value
		})
	}),
	'NEW_RECORD_CLASS': (data) => ({
		modalType: 'selection',
		preClose: (value) => ({
			type: 'NEW_RECORD_CLASS',
			selection: value.id || ''
		})
	}),
	'NEW_RECORD_CATEGORY': (data) => ({
		modalType: 'selection',
		preClose: (value) => ({
			type: 'NEW_RECORD_CATEGORY',
			selection: value.id || ''
		})
	}),
	'NEW_RECORD_TIME': (data) => ({
		modalType: 'selection',
		preClose: (value) => ({
			type: 'NEW_RECORD_TIME',
			slot: data.slot,
			selection: value
		})
	}),
	'NEW_RECORD_AMOUNT': (data) => ({
		modalType: 'numberPad',
		preClose: (value) => ({
			type: 'NEW_RECORD_AMOUNT',
			number: value
		})
	}),

	'AMOUNT_FILTER': (data) => ({
		modalType: 'numberPad',
		preClose: (value) => ({
			type: 'APPLY'+(data.type == 0? '_MIN': '_MAX')+'_FILTER',
			number: value
		})
	}),
	'CATEGORY_FILTER': (data) => ({
		modalType: 'category_filter',
		preClose: (value) => ({ type: 'APPLY_CATEGORY_FILTER' })
	}),
	'TIME_FILTER': (data) => ({
		modalType: 'time_filter',
		preClose: (value) => ({ type: 'APPLY_TIME_FILTER' })
	}),
	'NEW_RECORD_DATEPICKER': (data) => ({
		modalType: 'datepicker',
		preClose: (value) => ({ type: 'NEW_RECORD_DATEPICKER', time: value })
	})
}
const modalDirectivesPrep = {
	'datepicker': (data) => ({
		preLaunch: () => ({
			type: 'MODAL_INIT_DATEPICKER',
			viewTime:data.viewTime,
			focusTimes: data.focusTimes
		})
	}),
	'numberPad': (data) => ({
		preLaunch: () => ({
			type: 'MODAL_INIT_NUMBER_PAD',
			number: data.number
		})
	})
}
const getDirectives = (mission, data) => {
	const missionDirectives = missionDirectivesPrep[mission](data)
	return {
		...missionDirectives,
		...modalDirectivesPrep[missionDirectives.modalType](data)
	}

}
const launchModal = (mission, inputData) => (dispatch) => {
	const data = {...inputData};
	console.log('launch modal', mission, data)

	const directives = missionDirectivesPrep[mission](data)//getDirectives(mission, data)

	if (directives.preLaunch) {
		dispatch(directives.preLaunch())
	}
	const modalPromise = new Promise(
		(resolve, reject) => dispatch({
			 type: 'LAUNCH_MODAL',
			 modalType: directives.modalType,
			 resolve, reject, data
 		})
	)
	modalPromise.then( value => {
		if (directives.preClose) {
			dispatch(directives.preClose(value))
		}
		dispatch({ type: 'CLOSE_MODAL' })
	})
}

export const launchTimeSelection = slot => launchModal('NEW_RECORD_TIME', {
	slot: slot,
	title: 'SELECT '+slot.toUpperCase(),
	list: TIME_CONSTS.slot[slot],
	size:TIME_CONSTS.size[slot]
})
export const launchClassSelection = data => launchModal('NEW_RECORD_CLASS', {
	title: 'SELECT RECORD CLASS',
	list: data.classList,
	size: 1
})
export const launchCategorySelection = data => launchModal('NEW_RECORD_CATEGORY', {
	title: 'SELECT RECORD CATEGORY',
	list: data.categoryList,
	size: 1
})
export const launchDatepickerSelection = data => launchModal('NEW_RECORD_DATEPICKER', data)
export const launchInputAmount = data => launchModal('NEW_RECORD_AMOUNT', data)
export const launchInputNote = data => launchModal('NEW_RECORD_NOTE', data)

export const launchMaxAmountFilter = data => launchModal('AMOUNT_FILTER', {
	title:'MAX AMOUNT',
	type: 1,
	number: data.number
})
export const launchMinAmountFilter = data => launchModal('AMOUNT_FILTER', {
	title:'MIN AMOUNT',
	type: 0,
	number: data.number
})
export const launchCategoryFilter = data => launchModal('CATEGORY_FILTER', data)
export const launchTimeFilter = data => launchModal('TIME_FILTER', data)

export const createRecord = record => ({
	type: 'CREATE_RECORD', record
})

export const toggleCategoryFilter = category => ({
	type: 'TOGGLE_CATEGORY_FILTER', category
})

export const closeModal = () => ({
	type: 'CLOSE_MODAL'
})

export const toggleExpandFilters = () => ({
	type: 'TOGGLE_EXPAND_FILTERS'
})

export const clickNumberPad = number => ({
	type: 'CLICK_NUMBER_PAD', number
})
export const popNumberPad = () => ({
	type: 'POP_NUMBER_PAD'
})
export const clearNumberPad = () => ({
	type: 'CLEAR_NUMBER_PAD'
})

export const changeContent = content => ({
	type: 'CHANGE_CONTENT', content
})

export const nextMonth = () => ({
	type: 'NEXT_MONTH'
})

export const prevMonth = () => ({
	type: 'PREV_MONTH'
})

export const selectDate = (time, limit) => ({
	type: 'SELECT_DATE',
	time, limit
})
