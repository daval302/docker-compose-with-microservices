import React, { Component } from 'react';
import { connect } from 'react-redux';
import './User.css'
import { getItems, startGeneratingUserActions, stopGenerating } from '../reducers/paymentRequestReducer'

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
        if (!payment.generating)
            dispatch(startGeneratingUserActions())
        else
            dispatch(stopGenerating())
    }

    return (
        <div>
            <div clas="row" >

                <div class="col-sm-9">
                    {!payment.fetching &&
                        <button type="button" class="btn btn-primary" onClick={handleRequestItems}>Get Items</button>
                    }
                    {payment.fetching &&
                        <h2>Loading...</h2>
                    }
                    {payment.items.length > 0 &&
                        (
                            !payment.generating &&
                            <button type="button" class="btn btn-secondary" onClick={handleGeneratePaymentRequest} >Start generating user actions</button>
                            ||
                            <button type="button" class="btn btn-danger" onClick={handleGeneratePaymentRequest} >Stop generating user actions</button>
                        )
                    }
                </div>

                <div class="col-sm-9">
                    <ul class="list-group">
                        {payment.requests.length > 0 &&
                            payment.requests.map(element =>
                                <li class="list-group-item">Paying {element.quantity} {element.name}</li>
                            )
                        }
                    </ul>
                </div>
            </div>





        </div>
    )
}

export default connect(state => {
    const { user, payment } = state
    return { user, payment }
})(User)