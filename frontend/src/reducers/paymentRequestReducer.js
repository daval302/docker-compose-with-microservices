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

        default: return state

    }
}

// ACTIONS ...

export const fetchingFetchingItems = () => ({
    type: REQUEST_ITEMS
})

export const receivedItems = () => ({
    type: RECEIVED_ITEMS
})

export const getItems = () => (dispatch, getState) => {

    // Signal to the view comonent that we are fetching data
    dispatch(fetchingFetchingItems())

    // return axios.get("http://localhost:8081/items")
    //     .then(response => dispatch(receivedUserDetails(response.data)))
    //     // TODO("Error handling")
    //     .catch(error => console.log(error));

}

// TODO
export const generatePaymentRquest = () => ({
    // fetch items first 
    // generate payment request then
})