export * from './datepicker'
export * from './numberPad'

const missionDirectivesPrep = {
	'NEW_RECORD_DESC': (data) => ({
		modalType: 'text',
		preClose: (value) => ({
			type: 'NEW_RECORD_DESC',
			text: value
		})
	}),
	'NEW_RECORD_CLASS': (data) => ({
		modalType: 'selection',
		preClose: (value) => ({
			type: 'NEW_RECORD_CLASS',
			selection: value || ''
		})
	}),
	'NEW_RECORD_CATEGORY': (data) => ({
		modalType: 'selection',
		preClose: (value) => ({
			type: 'NEW_RECORD_CATEGORY',
			selection: value || ''
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
	'FROM_TIME_FILTER': (data) => ({
		modalType: 'datepicker',
		preClose: (value) => ({ type: 'APPLY_FROM_TIME_FILTER', time: value })
	}),
	'TO_TIME_FILTER': (data) => ({
		modalType: 'datepicker',
		preClose: (value) => ({ type: 'APPLY_TO_TIME_FILTER', time: value })
	}),
	'NEW_RECORD_DATEPICKER': (data) => ({
		modalType: 'datepicker',
		preClose: (value) => ({ type: 'NEW_RECORD_DATEPICKER', time: value })
	}),
	'TOGGLE_LOADER': (data) => {
		const toggleAction = () => ({
			type: 'TOGGLE_LOADER',
			open: data.open
		})
		return data.open? {
			modalType: 'loader',
			preLaunch: toggleAction
		} : {
			modalType: 'loader',
			forceClose: toggleAction
		}
	}
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
		// ...modalDirectivesPrep[missionDirectives.modalType](data),
		...missionDirectives
	}

}
const launchModal = (mission, inputData) => (dispatch) => {
	const data = {...inputData};

	const directives = getDirectives(mission, data)
	console.log('launch modal', mission, data, 'directives',directives)

	
	const launch = (resolve, reject) => dispatch({
		 type: 'LAUNCH_MODAL',
		 modalType: directives.modalType,
		 resolve, reject, data
	})
	const close = (value) => dispatch({ type: 'CLOSE_MODAL' })

	if (directives.preLaunch) {
		dispatch(directives.preLaunch())
	}
	if (!directives.forceClose) {
		const modalPromise = new Promise(launch)
		modalPromise.then( value => {
			if (directives.preClose) {
				dispatch(directives.preClose(value))
			}
			dispatch({ type: 'CLOSE_MODAL' })
		})
	} else {
		dispatch(directives.forceClose())
		dispatch({ type: 'CLOSE_MODAL' })
	}
}

export const toggleLoader = (open) => launchModal('TOGGLE_LOADER', { open })

// new record actions
export const launchTimeSelection = slot => launchModal('NEW_RECORD_TIME', {
	slot: slot,
	title: 'SELECT '+slot.toUpperCase(),
	list: TIME_CONSTS.slot[slot],
	size: TIME_CONSTS.size[slot]
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

export const launchInputDesc = data => launchModal('NEW_RECORD_DESC', data)

// filter actions
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

export const launchFromTimeFilter = data => launchModal('FROM_TIME_FILTER', data)

export const launchToTimeFilter = data => launchModal('TO_TIME_FILTER', data)
