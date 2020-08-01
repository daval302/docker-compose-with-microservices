import axios from "axios"
import { generateNPaymentRquests } from '../utils/helpers'

const REQUEST_ITEMS = "user/REQUEST_ITEMS"
const RECEIVED_ITEMS = "user/RECEIVED_ITEMS"
const SENDING_PAYMENT_REQUETS = "user/SENDING_PAYMENT_REQUETS"
const GENERATING_PAYMENT_REQUESTS = "user/GENERATING_PAYMENT_REQUESTS"

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

export const stopGenerating = () => (dispatch, getState) => {
    clearInterval(generatingInterval)
}

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

    generatingInterval = setInterval(() => {

        /**
         * TODO: bag in Store API: for some random checkouts error message: 
         * Cannot add or update a child row: a foreign key constraint fails 
         * (`store`.`checkouts`, CONSTRAINT `checkouts_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `items` (`id`))
         */
        const randomPaymentRequests = generateNPaymentRquests(5, getState().payment['items'])

        // Store API request to save checkout with state PENDING
        randomPaymentRequests.forEach((elem, _) => {
            dispatch(sendingPaymentRequests(elem))
            axios({
                method: "POST",
                url: "http://localhost:8081/checkouts",
                data: {
                    itemid: elem.id,
                    quantity: elem.quantity,
                    state: "PENDING",
                    ammount: elem.price * elem.quantity
                }
            })
                .then(response => {
                    // TODO
                    // checkout has been registered as PANDING
                    // now we need to request payment-api to do the payment
                    // response back and update store api with a checkout PAID state
                })
                .catch(error => {
                    // usually error 409 conflict TODO: investigate
                    //console.log(error)
                })
        })

        // TODO: axios payment request to pay-api

    }, 1000);

    // Notify User component: sending requests every seconds
    dispatch(generatingPayments())

}