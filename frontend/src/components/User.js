import React from 'react';
import { connect } from 'react-redux';
import './User.css'
import { getItems, startGeneratingUserActions, stopGenerating } from '../reducers/paymentRequestReducer'

const User = ({ dispatch, payment }) => {

    const handleRequestItems = e => {
        e.preventDefault();
        dispatch(getItems())
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
            <div className="row" >

                <div className="col-sm-9">
                    {!payment.fetching &&
                        <button type="button" className="btn btn-primary" onClick={handleRequestItems}>Get Items</button>
                    }
                    {payment.fetching &&
                        <h2>Loading...</h2>
                    }
                    {payment.items.length > 0 &&
                        (
                            !payment.generating &&
                            <button type="button" className="btn btn-secondary" onClick={handleGeneratePaymentRequest} >Start generating user actions</button>
                            ||
                            <button type="button" className="btn btn-danger" onClick={handleGeneratePaymentRequest} >Stop generating user actions</button>
                        )
                    }
                </div>

                <div className="col-sm-9">
                    <ul className="list-group">
                        {payment.requests.length > 0 &&
                            payment.requests.map(element =>
                            <li className="list-group-item">Paying {element.quantity} {element.name} (id: {element.id})</li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default connect(state => {
    const { payment } = state
    return { payment }
})(User)