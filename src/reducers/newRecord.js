export const newRecord = ( state = newRecordInit(), action ) => {
	switch ( action.type ) {
		case 'MODAL_SELECTION':
			return {
				...state,
				[action.entry]: action.selection
			}
		case 'NEW_RECORD_TIME':
			return action.selection? {
				...state,
				[action.slot]: action.selection
			} : state
		case 'NEW_RECORD_CLASS':
			return action.selection != state.classId? {
				...state,
				classId: action.selection,
				categoryId: ''
			} : state
		case 'NEW_RECORD_CATEGORY':
			return action.selection? {
				...state,
				categoryId: action.selection
			} : state
		case 'NEW_RECORD_AMOUNT':
			return action.number > -1? {
				...state,
				amount: action.number
			} : state
		case 'NEW_RECORD_DESC':
			return action.text? {
				...state,
				desc: action.text
			} : state
		case 'NEW_RECORD_DATEPICKER':
			return action.time? {
				...state,
				time: action.time
			} : state
		case 'CREATE_RECORD':
		case 'UPDATE_RECORD':
			return newRecordInit()
		case 'NEW_RECORD_RESET':
			return {
				...newRecordInit(),
				original: state.original
			}

		case 'EDIT_RECORD':
			return newRecordInit(action.record)

		default:
			return state
	}
}

const newRecordInit = (record) => {
    const time = record? (new Date(Number(record.time))): (new Date())
    const nr = {
        id: record? record.id: '',
        time: time.getTime(),
        year: time.getFullYear(),
        month: time.getMonth(),
        date: time.getDate(),
        amount: record? record.amount.toString(): '0',
        desc: record? record.desc: '',
        classId: record? record.class: '',
        categoryId: record? record.category: '',
    }
    return {
        ...nr, original: nr
    }
}

export const recordModified = (newRecord) => {
	console.log(newRecord)
	const { original } = newRecord
	let modified = false
	let attrs = Object.keys(original)

	for (let i = 0; i < attrs.length; i++) {
		console.log(attrs[i], newRecord[attrs[i]] != original[attrs[i]])
		if (newRecord[attrs[i]] != original[attrs[i]])
			return true
	}

	return false
}
