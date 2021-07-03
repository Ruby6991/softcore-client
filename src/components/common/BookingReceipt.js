import React, { Component } from 'react'
import Moment from 'react-moment';
import { Redirect } from "react-router-dom";
const axios = require("axios")

class BookingReceipt extends Component {

    constructor(props){
        super(props);
        
        this.state={
            bookingID:this.props.booking._id,
            vehicleNo:this.props.booking.vehicleNo,
            vehicleType:this.props.booking.vehicleType,
            model:this.props.booking.model,
            startTime:this.props.booking.startTime,
            endTime:this.props.booking.endTime,
            status:this.props.booking.status,
            currentDate: new Date()
        }
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            bookingID:nextProps.booking._id,
            vehicleNo:nextProps.booking.vehicleNo,
            vehicleType:nextProps.booking.vehicleType,
            model:nextProps.booking.model,
            startTime:nextProps.booking.startTime,
            endTime:nextProps.booking.endTime,
            status:nextProps.booking.status,
            currentDate: new Date()
         });  
    }

    handleCancel(){
        const booking = {
            bookingID:this.state.bookingID
        }
        axios.put("http://localhost:3000/bookings/cancel", booking)
        .then(function(res){
            alert("Cancellation Successful");
            window.location.reload();
        }).catch(function(error){
            console.log(error);
        })
    }

    render(){
        return (
            <div>
                <div className="booking-receipt">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">Booking ID: {this.state.bookingID.substring(0,8)}</span>
                            
                            <table >
                                <tbody>
                                <tr>
                                    <th>Vehicle Model</th>
                                    <td>{this.state.model}</td>
                                </tr>
                                <tr>
                                    <th>Vehicle Number</th>
                                    <td>{this.state.vehicleNo}</td>
                                </tr>
                                <tr>
                                    <th>Vehicle Type</th>
                                    <td>{this.state.vehicleType}</td>
                                </tr>
                                <tr>
                                    <th>Start time</th>
                                    <td><Moment>{this.state.startTime}</Moment></td>
                                </tr>
                                <tr>
                                    <th>End time</th>
                                    <td><Moment>{this.state.endTime}</Moment></td>
                                </tr>
                                <tr>
                                    <th>Booking Status</th>
                                    <th>{this.state.status}</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-action">
                        {
                        //cancellation can be done only 12 Hrs before the actual service start time
                        (Math.abs(this.state.currentDate - new Date(this.state.startTime)) / 36e5>12 
                            && this.state.status==="pending" )?(
                            <button id="edit-btn" onClick={this.handleCancel}>Cancel</button>
                        ):(
                            "")
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default BookingReceipt;
