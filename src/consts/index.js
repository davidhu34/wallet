export const filterInit = {
    class: {
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
    category: {
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
            id: '1',
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
    selected: {
        time: { from: null, to: null },
        amount: { min: null, max: null},
        category: []
    },
    selecting: {
        time: { from: null, to: null },
        amount: { min: null, max: null},
        category: []
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

export const initRecord = {
    records: {
        '1': {
            id: '1',
            time: 1318874398806,
            class: 'food',
            category: 'lunch',
            exchange: 100,
            note: 'lunch'
        },
        '2': {
            id: '2',
            time: 1318871398801,
            class: 'travel',
            category: 'hsr',
            exchange: 1200,
            note: 'HSR to Kaohsiung'
        },
        '3': {
            id: '3',
            time: 1308874398701,
            class: 'travel',
            category: 'hsr',
            exchange: 1200,
            note: 'HSR to Taipei'
        },
        '4': {
            id: '4',
            time: 1318874398806,
            class: 'food',
            category: 'dinner',
            exchange: 100,
            note: 'dinner mwd'
        },
        '5': {
            id: '5',
            time: 1318879398801,
            class: 'travel',
            category: 'mrt',
            exchange: 1200,
            note: 'MRT to work'
        },
        '6': {
            id: '6',
            time: 1308884398701,
            class: 'travel',
            category: 'mrt',
            exchange: 1200,
            note: 'MRT to home'
        },
        '7': {
            id: '7',
            time: 1318974398806,
            class: 'food',
            category: 'drink',
            exchange: 100,
            note: 'comebuy'
        },
        '8': {
            id: '8',
            time: 1319871398801,
            class: 'travel',
            category: 'bus',
            exchange: 1200,
            note: 'bus to school'
        },
        '9': {
            id: '9',
            time: 1328874398701,
            class: 'travel',
            category: 'bus',
            exchange: 1200,
            note: 'bus home'
        }
    }
}
