import axios from "axios"
import { generateNPaymentRquests } from '../utils/helpers'
import {PAYMENT_API_URL, DATA_API_URL} from '../utils/endpoints'

const REQUEST_ITEMS = "user/REQUEST_ITEMS"
const RECEIVED_ITEMS = "user/RECEIVED_ITEMS"
const SENDING_PAYMENT_REQUETS = "user/SENDING_PAYMENT_REQUETS"
const GENERATING_PAYMENT_REQUESTS = "user/GENERATING_PAYMENT_REQUESTS"
const STOPPED_GENERATING = "user/STOPPED_GENERATING"

const MAX_ELEMENT_LIST = 15

const paymentRequestDTO = {
    name: "",
    price: 0.0,
    quantity: 0
}

var generatingInterval

export default (state = {
    dto: paymentRequestDTO,
    items: [],
    fetching: false,
    requesting: false,
    generating: false,
    requests: []
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
            // Update the number of requets shown in the view only for 5 elements
            if (state.requests.length == MAX_ELEMENT_LIST)
                state.requests = []
            state.requests.push(action.payload)
            return {
                ...state,
                requesting: true
            }

        case GENERATING_PAYMENT_REQUESTS:
            return {
                ...state,
                generating: true
            }

        case STOPPED_GENERATING:
            return {
                ...state,
                generating: false
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

export const generatingPayments = () => ({
    type: GENERATING_PAYMENT_REQUESTS
})

export const stopGenerating = () => {
    clearInterval(generatingInterval)
    return {
        type: STOPPED_GENERATING
    }
}

export const getItems = () => (dispatch, getState) => {

    // Signal to the view comonent that we are fetching data
    dispatch(fetchingFetchingItems())

    return axios({
        method: 'GET',
        url: DATA_API_URL + "/items"
    })
        .then(response => {
            let items = response.data._embedded.items
            items.forEach((element, index) => {
                const id = /\d+$/.exec(element._links.self.href)[0]
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

    generatingInterval = setInterval(() => {

        const randomPaymentRequests = generateNPaymentRquests(5, getState().payment['items'])

        // Store API request to save checkout with state PENDING
        randomPaymentRequests.forEach((elem, _) => {
            dispatch(sendingPaymentRequests(elem))
            axios({
                method: "POST",
                url: DATA_API_URL + "/checkouts",
                data: {
                    itemid: elem.id,
                    quantity: elem.quantity,
                    state: "PENDING",
                    ammount: elem.price * elem.quantity
                }
            })
                .then(response => {

                    // Get checkout Id
                    let checkoutId = /\d+$/.exec(response.data._links.checkout.href)[0]

                    // data-api save checkout as PENDING
                    axios({
                        method: "POST",
                        url:  PAYMENT_API_URL + "/payment-api/pay",
                        data: { checkoutId }
                    })
                        .then(response => console.log("Successiful payment for checkout id: ", checkoutId))
                        .catch(error => console.log("Failed to pay for checkout id: " + checkoutId))
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }, 1000);

    // Notify User component: sending requests every seconds
    dispatch(generatingPayments())

}