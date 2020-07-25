import React, { Component } from 'react';
import { connect } from 'react-redux';
import './User.css'
import { getItems } from '../reducers/paymentRequestReducer'

const User = ({ dispatch, user, payment }) => {

    const handleRequestItems = e => {
        e.preventDefault();
        // Request User items
        dispatch(getItems())
        // TODO("Enable Logging")
        console.log("Requested items")
    }


    return (
        <div className="card">
            <h1>User card component</h1>
            <p>I am use trying to buy stuff for my kitchen</p>
            <input type="button" value="Get Items" onClick={handleRequestItems}/>
            {payment.fetching &&
                <h2>Loading...</h2>                
            }
        </div>
    )
}

export default connect(state => {
    const { user, payment } = state
    return { user, payment }
})(User)