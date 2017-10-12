import { TIME_CONSTS, recordInit } from '../consts' 

const classData = recordInit.class

const missionMap = {
	'NEW_RECORD_NOTE': (data) => ({
		util: 'text',
		action: (value) => ({
			type: 'NEW_RECORD_NOTE',
			text: value
		})
	}),
	'NEW_RECORD_CLASS': (data) => ({
		util: 'selection',
		action: (value) => ({
			type: 'NEW_RECORD_CLASS',
			selection: value.id
		})
	}),
	'NEW_RECORD_CATEGORY': (data) => ({
		util: 'selection',
		action: (value) => ({
			type: 'NEW_RECORD_CATEGORY',
			selection: value.id
		})
	}),
	'NEW_RECORD_TIME': (data) => ({
		util: 'selection',
		action: (value) => ({
			type: 'NEW_RECORD_TIME',
			slot: data.slot,
			selection: value
		})
	}),
	'NEW_RECORD_AMOUNT': (data) => ({
		util: 'numberPad',
		action: (value) => ({
			type: 'NEW_RECORD_AMOUNT',
			number: value
		})
	}),

	'AMOUNT_FILTER': (data) => ({
		util: 'numberPad',
		action: (value) => ({
			type: 'APPLY'+(data.type == 0? '_MIN': '_MAX')+'_FILTER',
			number: value
		})
	}),
	'CATEGORY_FILTER': (data) => ({
		util: 'category_filter',
		action: (value) => ({ type: 'APPLY_CATEGORY_FILTER' })
	}),
	'TIME_FILTER': (data) => ({
		util: 'time_filter',
		action: (value) => ({ type: 'APPLY_TIME_FILTER' })
	})
}
const launchModal = (mission, data) => (dispatch) => {
	console.log('launch modal', mission, data)
	//dispatch({ type: 'LAUNCH_MODAL'})

	const modalMission = missionMap[mission](data)

	const modalPromise = new Promise(
		(resolve, reject) => dispatch({
			 type: 'LAUNCH_MODAL',
			 util: modalMission.util,
			 resolve, reject, data
 		})
	)
	modalPromise.then( value => {
		dispatch(modalMission.action(value))
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
export const launchInputAmount = data => launchModal('NEW_RECORD_AMOUNT', data)
export const launchInputNote = data => launchModal('NEW_RECORD_NOTE', data)
export const launchAmountFilter = data => launchModal('AMOUNT_FILTER', data)
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