import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class CustomerLinks extends Component{
    constructor(props){
        super(props);
        this.signOut=this.signOut.bind(this);
    }

    signOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userType");
        console.log(localStorage);
    }

    render(){
        return (
            <ul>
                <li><NavLink to='/create'><span class="material-icons">edit_notifications</span>Create</NavLink></li>
                <li><a href="/" onClick={this.signOut}>Logout</a></li>
            </ul>
        )
    }
    
}

export default CustomerLinks