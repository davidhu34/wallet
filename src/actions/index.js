export const Add = () => ({
    type: 'ADD'
})

export const launchModal = (util) => (dispatch) => {
    dispatch({
        type: 'LAUNCH_MODAL'
    })

    const modalReturn = new Promise( (resolve, reject) => {
        dispatch({
            resolve, reject,
            type: 'LAUNCH_MODAL_SELECTION'
        })
    })
    modalReturn.then( value => {
        dispatch({
            type: 'CLOSE_MODAL'
        })
    })
}
export const closeModal = () => ({
    type: 'CLOSE_MODAL'
})
