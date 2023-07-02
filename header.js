import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

function HeaderBar(){
    return(
        <div className="header">
            <div className="Title">
                <Link to="/" style={{'text-decoration':'none', 'color':'Black'}}>
                    <h1>DanGo!</h1>
                </Link>
            </div>
            <div className="cart-icon">
                <input type="image" src="icons8-cart-50.png" className="nav-button"></input>
            </div>
        </div>
    );          
}

export default HeaderBar;