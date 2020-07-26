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
    items: [],
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
                items: action.payload,
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
        .then(response => {
            let items = response.data._embedded.items
            items.forEach((element, index) => {
                const id  = element._links.self.href.substr(element._links.self.href.length-1)
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

// TODO
export const generatePaymentRquest = () => ({
    // fetch items first 
    // generate payment request then
})