
const paymentRequestDTO = { 
    itemId: -1,
    name: "",
    price: 0.0,
    quantity: 0 
}

export default (state = paymentRequestDTO, action) => {

    switch (action.type) {

        default: return state

    }
}

// ACTIONS ...

// TODO
export const generatePaymentRquest = () => ({
    // fetch items first 
    // generate payment request then
})