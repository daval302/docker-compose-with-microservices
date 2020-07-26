import React, { Component } from 'react';
import { connect } from 'react-redux';
import './User.css'
import { getItems } from '../reducers/paymentRequestReducer'
import { generatePaymentRquest } from '../utils/helpers'

const User = ({ dispatch, user, payment }) => {

    const handleRequestItems = e => {
        e.preventDefault();
        // Request User items
        dispatch(getItems())
        // TODO("Enable Logging")
        console.log("Requested items")
    }

    // TODO - handle with dispatch event -> state 
    const handleGeneratePaymentRequest = e => {
        e.preventDefault()
        console.log(JSON.stringify(generatePaymentRquest(payment.items)))
    }


    return (
        <div className="card">
            <h1>User card component</h1>
            <p>I am use trying to buy stuff for my kitchen</p>
            {!payment.fetching &&
                <input type="button" value="Get Items" onClick={handleRequestItems} />
            }
            {payment.fetching &&
                <h2>Loading...</h2>
            }
            {payment.items.length > 0 &&
                <input type="button" value="Generate payment request" onClick={handleGeneratePaymentRequest} />
            }

        </div>
    )
}

export default connect(state => {
    const { user, payment } = state
    return { user, payment }
})(User)