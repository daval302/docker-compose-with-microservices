import axios from "axios"
import { generatePaymentRquest } from '../utils/helpers'

const REQUEST_ITEMS = "user/REQUEST_ITEMS"
const RECEIVED_ITEMS = "user/RECEIVED_ITEMS"
const SENDING_PAYMENT_REQUETS = "user/SENDING_PAYMENT_REQUETS"

const paymentRequestDTO = {
    name: "",
    price: 0.0,
    quantity: 0
}

export default (state = {
    dto: paymentRequestDTO,
    items: [],
    fetching: false,
    requesting: false
}, action) => {

    switch (action.type) {

        case REQUEST_ITEMS:
            return {
                ...state,
                fetching: true
            }

        case RECEIVED_ITEMS:
            return {
                ...state,
                items: action.payload,
                fetching: false
            }

        case SENDING_PAYMENT_REQUETS:
            return {
                ...state,
                requesting: true
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

export const sendingPaymentRequests = data => ({
    type: SENDING_PAYMENT_REQUETS,
    payload: data
})

export const getItems = () => (dispatch, getState) => {

    // Signal to the view comonent that we are fetching data
    dispatch(fetchingFetchingItems())

    return axios({
        method: 'GET',
        url: "http://localhost:8081/items"
    })
        .then(response => {
            let items = response.data._embedded.items
            items.forEach((element, index) => {
                const id = element._links.self.href.substr(element._links.self.href.length - 1)
                items[index] = {
                    id,
                    name: element['name'],
                    price: element['price']
                }
            });

            console.log("Received " + items.length + " items")
            dispatch(receivedItems(items))
        })
        .catch(error => {
            console.log(error)
        });
}

export const startGeneratingUserActions = () => (dispatch, getState) => {

    setInterval(() => {
        
        // Notify the the state of sending payment requests
        const result = generatePaymentRquest(getState().payment['items'])
        dispatch(sendingPaymentRequests(result))

        // TODO: axios to send payment to payment-api

    }, 1000);
}