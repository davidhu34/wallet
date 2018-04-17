export const formatNewRecord = (newRecord) => ({
	id: newRecord.id,
	time: newRecord.time,
	class: newRecord.classId,
	category: newRecord.categoryId,
	amount: newRecord.amount,
	desc: newRecord.desc
})

export const filterRecords = (filters, record) => {
	console.log(filters)
	const { min, max, from, to, categories } = filters
	const { records } = record
	const recordIdList = recordIdListFromTimeSpan(record, from, to)
	console.log(recordIdList, from , to)
	const steps = []
	// if (to) steps.push( (r) => r.time > to )
	// if (from) steps.push( (r) => r.time < from )
	if (min || max) steps.push( (r) => min && r.amount < min || max && r.amount > max )
	const ctgSet = new Set()
	if ( categories.length > 0 ) {
		categories.forEach( ctg => ctgSet.add(ctg) )
		steps.push( (r) => ctgSet.has(r.category) == -1 )
	}

	const data = steps.length > 0?
		recordIdList.filter( id => {
			const r = records[id]
			for (let i = 0; i < steps.length; i++)
				if (steps[i](r))
					return false
			return true
		}) : recordIdList

	return data.map( id => {
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
const thisMonday = () => {
	const today = new Date()
	const weekDay = today.getDay()
	const diff = weekDay? weekDay-1: 6
	return new Date(0)//new Date(today.getFullYear(), today.getMonth(), today.getDate()-diff)
}
const thisFirstOfMonth = () => {
	const today = new Date()
	return new Date(today.getFullYear(), today.getMonth(), 1)
}
const recordIdListFromTimeSpan = (record, fromTime, toTime) => {
	if (!toTime) toTime = (new Date()).getTime()

	const { records, timeline } = record

	let order = 0
	let start = null
	let end = timeline.length-1

	while (timeline.length > order) {
		const id = timeline[order]
		const time = records[id].time
		if ( start == null && time <= toTime) {
			start = order
		} else if ( fromTime > time ) {
			end = order
			break
		}
		order++
	}
	return start != null? timeline.slice(start, end+1): []
}
const weekRecordIdList = (record) => recordIdListFromTimeSpan(record, thisMonday())
const monthRecordIdList = (record) => recordIdListFromTimeSpan(record, thisFirstOfMonth())

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
/*
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
}*/
export const getTotal = (recordList) => {
	let total = 0
	recordList.map( r => { total += Number(r.amount) })
	return total
}
const arraySum = (array) => {
	let sum = 0
	for (let i = 0; i < array.length; i++) {
		sum += Number(array[i])
	}
	return sum
}
const getCategoryRecordIds = (categoryData) => {
	return categoryRecordIds
}
export const getOverview = (overview, record) => {
	const { records } = record
	const { totalType, topType, topCategoryType } = overview

	const recordIdList = [weekRecordIdList, monthRecordIdList][totalType](record)
	let recordSet = new Set()
	recordIdList.forEach( id => recordSet.add(id))

	let total = 0
	recordIdList.map( id => { total += Number(records[id].amount) })


	const categoryData = record[['classes', 'categories'][topCategoryType]]

	let categoryRecordIds = {}
	Object.keys(categoryData).map( ctg => {
		categoryRecordIds[ctg] = categoryData[ctg].timeline.filter( id => recordSet.has(id))
	})
	const topCategoryItem = [
		ctg => ({
			category: categoryData[ctg],
			sum: arraySum(
				categoryRecordIds[ctg].map( idx => records[idx].amount )
			)
		}),
		ctg => ({
			category: categoryData[ctg],
			count: categoryRecordIds[ctg].length
		})
	]
	const topSort = [
		(a,b) => b.sum - a.sum,
		(a,b) => b.count - a.count
	]
	const topCategoryList = Object.keys(categoryRecordIds)
		.map(ctg => topCategoryItem[topType](ctg))
		.sort(topSort[topType])

	return {
		total: total,
		topCategoryList: topCategoryList.slice(0,3)
	}
}

export const classList = classes => Object.keys(classes).map( c => classes[c] )
export const categoryList = categories => categories.map( c => categories[c] )
export const classCategories = record => {
	const { classes, categories } = record
	let cc = {}
	Object.keys(classes).forEach( cl => { cc[cl] = [] })
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
