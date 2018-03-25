import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectionStyle } from '../styles'
import { monthNames } from '../consts'
import { nextMonth, prevMonth, nextYear, prevYear, selectDate } from '../actions'


const DatepickerModal = ({
    resolve, title, limit,
    viewTime, focusTimes,
    prevMonth, nextMonth, prevYear, nextYear, selectDate
}) => {

    const selectedTime = new Date(viewTime)
    const selectedYear = selectedTime.getFullYear()
    const selectedMonth = selectedTime.getMonth()
    const selectedDate = selectedTime.getDate()
    const selectedDay = selectedTime.getDay()

    console.log('selected', selectedYear, selectedMonth, selectedDate, selectedDay)


    const totalDays = new Date(selectedYear, selectedMonth+1, 0).getDate()
    const firstWeekDay = new Date(selectedYear, selectedMonth, 1).getDay()

    console.log('totalDays', totalDays, 'firstWeekDay', firstWeekDay)
    const prevMonthLast = new Date(selectedYear, selectedMonth, 0)
    const prevMonthDays = prevMonthLast.getDay()+1
    const nextMonthFirst = new Date(selectedYear, selectedMonth+1, 1)
    const nextMonthDays = 7-nextMonthFirst.getDay()

    console.log(prevMonthLast,prevMonthDays,nextMonthFirst,nextMonthDays)
    const days = [
        ...Array.from(Array(prevMonthDays).keys(), x => prevMonthLast.getDate()-prevMonthDays+x+1),
        ...Array.from(Array(totalDays).keys(), x => x + 1),
        ...Array.from(Array(nextMonthDays).keys(), x => x + 1)
    ]
    const focusDays = ( focusTimes.length? focusTimes: [] )
        .filter(ft => ft > prevMonthLast.getTime() && ft < nextMonthFirst.getTime())
        .map(ft => new Date(ft).getDate())

    const options = days.map( (day,i) => {
        const isPrev = i < prevMonthDays
        const isNext = i >= days.length - nextMonthDays
        const clickedMonth = isPrev? selectedMonth-1
            : isNext? selectedMonth-1
            : selectedMonth
        return <div key={i}
            onClick={ (e) =>
                selectDate(new Date(selectedYear, clickedMonth, day).getTime(), limit)
            }
            style={{
                ...selectionStyle,
                width: String(100/7)+'%',
                height: 120
            }}>
            { isNext || isPrev?
                <span style={{ color: 'gray' }}>{day}</span>

            : focusDays.indexOf(day) > -1?
                <b>{day}</b>

            : <span>{day}</span>
            }
        </div>
    })

    return <div className="container">
        <strong>{title}</strong>

        <br /><br />

        <div onClick={ (e) => prevYear() }
            style={{
                ...selectionStyle,
                width:'25%'
            }}>
            {'<'}
        </div>
        <div style={{
                ...selectionStyle,
                width: '50%'
            }}>
            { selectedYear }
        </div>
        <div onClick={ (e) => nextYear() }
            style={{
                ...selectionStyle,
                width: '25%'
            }}>
            {'>'}
        </div>
        <br /><br />
        <div onClick={ (e) => prevMonth() }
            style={{
                ...selectionStyle,
                width:'25%'
            }}>
            {'<'}
        </div>
        <div style={{
                ...selectionStyle,
                width: '50%'
            }}>
            { monthNames[selectedMonth] }
        </div>
        <div onClick={ (e) => nextMonth() }
            style={{
                ...selectionStyle,
                width: '25%'
            }}>
            {'>'}
        </div>

        <br /><br />

        {options}

        <div onClick={ (e) => resolve(focusTimes[0]) }>APPLY</div>
        <div onClick={ (e) => resolve(null) }>CANCEL</div>
    </div>
}

export default connect(
    ({ datepicker }) => ({ ...datepicker }),
    dispatch => ({
        prevMonth: () => dispatch(prevMonth()),
        nextMonth: () => dispatch(nextMonth()),
        prevYear: () => dispatch(prevYear()),
        nextYear: () => dispatch(nextYear()),
        selectDate: (time, limit) => dispatch(selectDate(time, limit))
    })
)(DatepickerModal)
