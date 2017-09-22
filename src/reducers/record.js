import moment from 'moment'

const initRecord = {
    records: {
        '1': {
            id: '1',
            time: 1318874398806,
            category: 'food',
            exchange: 100,
            note: 'lunch'
        },
        '2': {
            id: '2',
            time: 1318871398801,
            category: 'travel',
            exchange: 1200,
            note: 'HSR to Kaohsiung'
        },
        '3': {
            id: '3',
            time: 1308874398701,
            category: 'travel',
            exchange: 1200,
            note: 'HSR to Taipei'
        },
        '4': {
            id: '4',
            time: 1318874398806,
            category: 'food',
            exchange: 100,
            note: 'lunch'
        },
        '5': {
            id: '5',
            time: 1318871398801,
            category: 'travel',
            exchange: 1200,
            note: 'HSR to Kaohsiung'
        },
        '6': {
            id: '6',
            time: 1308874398701,
            category: 'travel',
            exchange: 1200,
            note: 'HSR to Taipei'
        }
    }
}

let tempCount = 3

export const record = (state = initRecord, action) => {
    switch (action.type) {
        default:
            return state
    }
}
