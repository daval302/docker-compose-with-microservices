import React, { Component } from 'react';
import { connect } from 'react-redux';
import './User.css'
import { getItems, startGeneratingUserActions } from '../reducers/paymentRequestReducer'

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
        dispatch(startGeneratingUserActions())
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
                <input type="button" value="Start generating user actions" onClick={handleGeneratePaymentRequest} />
            }

        </div>
    )
}

export default connect(state => {
    const { user, payment } = state
    return { user, payment }
})(User)