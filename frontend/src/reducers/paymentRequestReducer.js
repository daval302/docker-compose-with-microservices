import axios from "axios"


const REQUEST_ITEMS = "user/REQUEST_ITEMS"
const RECEIVED_ITEMS = "user/RECEIVED_ITEMS"

const paymentRequestDTO = {
    itemId: -1,
    name: "",
    price: 0.0,
    quantity: 0
}

export default (state = {
    dto: paymentRequestDTO,
    fetching: false
}, action) => {

    switch (action.type) {

        case REQUEST_ITEMS:
            return {
                ...state,
                fetching: true
            }

        // add payload
        case RECEIVED_ITEMS:
            return {
                ...state,
                fetching: false
            }

        default: return state

    }
}

// ACTIONS ...

export const fetchingFetchingItems = () => ({
    type: REQUEST_ITEMS
})

export const receivedItems = data => ({
    type: RECEIVED_ITEMS,
    payload: data
})

export const getItems = () => (dispatch, getState) => {

    // Signal to the view comonent that we are fetching data
    dispatch(fetchingFetchingItems())

    return axios({
        method: 'GET',
        url: "http://localhost:8081/items"
    })
        .then(response => dispatch(receivedItems(response.data)))
        .catch(error => {
            console.log(error)
        });

}

// TODO
export const generatePaymentRquest = () => ({
    // fetch items first 
    // generate payment request then
})