export const Add = () => ({
    type: 'ADD'
})

export const selectMessage = message => ({
    type: 'SELECT_MESSAGE',
    message: message
})

export const updateInputMessage = value => ({
    type: 'INPUT_MESSAGE_UPDATE',
    value: value
})

export const sendInputMessage = message => ({
    type: 'INPUT_MESSAGE_SEND',
    message: message
})
