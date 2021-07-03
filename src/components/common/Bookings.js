import React, { Component } from 'react'
import BookingReceipt from './BookingReceipt'
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import _ from "lodash";
const axios = require("axios");

const sortOptions = [
    { value: 'desc', label: 'Newest to Oldest' },
    { value: 'asc', label: 'Oldest to Newest' },
  ];

const filterOptions = [
    { value: 'LIGHT', label: 'Light Vehicles' },
    { value: 'HEAVY', label: 'Heavy Vehicles' },
  ];

class Bookings extends Component {

    constructor(props){
        super(props);
        this.state={
            bookings:[],
            filteredBookings:[],
            view:true
        }
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount(){
        const that = this;

        axios.get("http://localhost:3000/bookings/all")
        .then(function(res){
            console.log(res.data);
            that.setState({
                bookings:res.data.bookings
            })
        }).catch(function(error){
            console.log(error);
        })
    }

    handleSortChange = (selectedOption) => {
        let sortedBookings = this.state.bookings;
        sortedBookings = _.orderBy(sortedBookings, ['startTime'],[selectedOption.value]);
        console.log(sortedBookings);
        this.setState({ 
            bookings:sortedBookings
        });
        console.log(`Option selected:`, selectedOption);
    }

    handleFilterChange = (selectedOption) => {
        const allBookings = this.state.bookings;

        const filteredBookings = allBookings.filter(function (e) {
            return e.vehicleType === selectedOption.value;
        });
        console.log(filteredBookings);
        this.setState({
            filteredBookings:filteredBookings,
            view:false
        })
    }

    // handleHeavyFilter = () => {   
        // const allBookings = this.state.bookings;

        // const heavyBookings = allBookings.filter(function (e) {
        //     return e.vehicleType === 'HEAVY';
        // });
        // console.log(heavyBookings);
        // this.setState({
        //     filteredBookings:heavyBookings,
        //     view:false
        // })
    // }

    // handleLightFilter = () => {   
    //     const allBookings = this.state.bookings;

    //     const lightBookings = allBookings.filter(function (e) {
    //         return e.vehicleType === 'LIGHT';
    //     });
    //     console.log(allBookings);
    //     this.setState({
    //         filteredBookings:lightBookings,
    //         view:false
    //     })
    // }

    render(){
        return (
            <div>
                <Navbar/>
                {this.state.redirect?(
                       <Redirect to="/bookings"/>
                   ):("")}
                <div className="bookings-history">
                    <h1>Bookings </h1>
                    {/* <button id="edit-btn" onClick={this.handleHeavyFilter}>Heavy Vehicle Bookings</button>
                    <button id="edit-btn" onClick={this.handleLightFilter}>Light Vehicle Bookings</button> */}
                    <Select options={ filterOptions } onChange={this.handleFilterChange} placeholder="Filter By"/>
                    <Select options={ sortOptions } onChange={this.handleSortChange} placeholder="Sort By"/>

                                {this.state.view?(
                                    this.state.bookings && this.state.bookings.map(booking =>
                                {
                                    return(
                                        <BookingReceipt booking={booking} key={booking.id}/>
                                    )
                                })
                                ):(this.state.filteredBookings && this.state.filteredBookings.map(filteredBooking =>
                                    {
                                        return(
                                            <BookingReceipt booking={filteredBooking} key={filteredBooking.id}/>
                                        )
                                    }
                                )
                                )}
                    <br/>
                </div>
                <Footer/>
            </div>
        )
    }
    
}

export default Bookings;
