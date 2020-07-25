import React, { Component }  from 'react';
import { connect } from 'react-redux';
import './User.css'

const User = ({ dispatch }) => {
    return (
        <div className="card">
            <h1>User card component</h1>
            <p>I am use trying to buy stuff for my kitchen</p>
        </div>
    )
}

export default connect( state => {
    const {user, dto} = state
    return {user, dto}
} )(User)