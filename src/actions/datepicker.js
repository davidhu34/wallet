export const nextMonth = () => ({
	type: 'NEXT_MONTH'
})

export const prevMonth = () => ({
	type: 'PREV_MONTH'
})

export const nextYear = () => ({
	type: 'NEXT_YEAR'
})

export const prevYear = () => ({
	type: 'PREV_YEAR'
})

export const selectDate = (time, limit) => ({
	type: 'SELECT_DATE',
	time, limit
})