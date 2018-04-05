export const contentRoutes = {
	'HOME': '/',
	'NEW_RECORD': '/new',
	'RECORD_LIST': '/list',
	'OTHER_MENU': '/other'
}
export const routeContents = {
	'/': 'HOME',
	'/new': 'NEW_RECORD',
	'/list': 'RECORD_LIST',
	'/other': 'OTHER_MENU'
}

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December']
const monthIndex = {
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'Auguest': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11
}
export const TIME_CONSTS = {
    slot: {
        year: ['2016', '2017', '2018'],
        month: monthNames,
        date: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    },
    size: {
        year: 1,
        month: 1,
        date: 7
    }
}

export const newRecordInit = () => {
    const now = new Date()
    return {
        time: now.getTime(),
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        amount: '0',
        desc: '',
        classId: '',
        categoryId: '',
    }
}

export const filterInit = {
    amount: { min: null, max: null},
    time: { from: null, to: null },
    categories: [],
    selecting: {
        categories: []
    }
}

export const uiInit = {
    modal: false,
    banner: {
        expand: false,
        title: 'Wallet'
    },
    content: 'HOME'
}

export const recordInit = {
    classes: {
        '1': {
            id: '1',
            name: 'food',
            category: ['1' ,'2', '3', '4']
        },
        '2': {
            id: '2',
            name: 'travel',
            category: ['5' ,'6', '7']
        }
    },
    categories: {
        '1': {
            id: '1',
            name: 'breakfast',
            class: '1'
        },
        '2': {
            id: '2',
            name: 'lunch',
            class: '1'
        },
        '3': {
            id: '3',
            name: 'dinner',
            class: '1'
        },
        '4': {
            id: '4',
            name: 'drink',
            class: '1'
        },
        '5': {
            id: '5',
            name: 'mrt',
            class: '2'
        },
        '6': {
            id: '6',
            name: 'bus',
            class: '2'
        },
        '7': {
            id: '7',
            name: 'hsr',
            class: '2'
        }
    },
    records: {
        '1': {
            id: '1',
            time: 1318874398806,
            class: 'food',
            category: '2',
            amount: 100,
            note: 'lunch'
        },
        '2': {
            id: '2',
            time: 1318871398801,
            class: 'travel',
            category: '7',
            amount: 1200,
            note: 'HSR to Kaohsiung'
        },
        '3': {
            id: '3',
            time: 1308874398701,
            class: 'travel',
            category: '7',
            amount: 1200,
            note: 'HSR to Taipei'
        },
        '4': {
            id: '4',
            time: 1318874398806,
            class: 'food',
            category: '3',
            amount: 100,
            note: 'dinner JSP'
        },
        '5': {
            id: '5',
            time: 1318879398801,
            class: 'travel',
            category: '5',
            amount: 1200,
            note: 'MRT to work'
        },
        '6': {
            id: '6',
            time: 1308884398701,
            class: 'travel',
            category: '5',
            amount: 1200,
            note: 'MRT to home'
        },
        '7': {
            id: '7',
            time: 1318974398806,
            class: 'food',
            category: '4',
            amount: 100,
            note: 'comebuy'
        },
        '8': {
            id: '8',
            time: 1319871398801,
            class: 'travel',
            category: '6',
            amount: 1200,
            note: 'bus to school'
        },
        '9': {
            id: '9',
            time: 1328874398701,
            class: 'travel',
            category: '6',
            amount: 1200,
            note: 'bus home'
        }
    },
    visibleRecords: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
}
