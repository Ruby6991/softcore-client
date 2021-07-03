import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class ManagerLinks extends Component{
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
                <li><NavLink to='/bookings'><span class="material-icons">book_online</span>Bookings</NavLink></li>
                <li><NavLink to='/createBooking'><span class="material-icons">edit_notifications</span>Create</NavLink></li>
                <li><NavLink to='/assign'><span class="material-icons">assignment_ind</span>Assign</NavLink></li>
                <li><a href="/" onClick={this.signOut}>Logout</a></li>
            </ul>
        )
    }
    
}

export default ManagerLinks