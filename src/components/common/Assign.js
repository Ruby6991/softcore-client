import React, { Component } from 'react'
import M from "materialize-css"
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { Redirect } from "react-router-dom";
import Select from 'react-select';
const axios = require("axios")

class Assign extends Component {
    constructor(props){
        super(props);
        this.state={
            bookings:[],
            substations:{},
            employees:{},
            updatedBookings:{},
            selectedStations:new Array(),
            selectedEmployees:new Array(),
            isAssignmentComplete:false
        }
        this.handleStationChange = this.handleStationChange.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    }
    

    componentDidMount(){
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});

        const that = this;

        const data = {
            dateCheck:new Date()
        }
        console.log(data);
        axios.post("http://localhost:3000/bookings/perday",data)
        .then(function(res){
            
            let bookings = res.data.bookings;
            console.log(bookings); 
                
            const unassignedBookings = bookings.filter(booking => {
                if(!(booking.hasOwnProperty('substation'))){
                    return booking
                }
            })
            
            console.log(unassignedBookings);
            if(unassignedBookings.length>1){
                that.setState({
                    bookings:unassignedBookings
                })
            }

        }).catch(function(error){
            console.log(error);
        })

        axios.get("http://localhost:3000/substations/all")
        .then(function(res){
            console.log(res.data);

            let substations = res.data.substations;
            const availableSubs = substations.map(substation => {
                if(substation.availability){
                    return { label:substation.stationNo+"-"+substation.stationType, 
                        value: substation.stationNo }
                }
            })
            that.setState({
                substations:availableSubs
            })
        }).catch(function(error){
            console.log(error);
        })

        axios.get("http://localhost:3000/employees/all")
        .then(function(res){
            console.log(res.data);
            let employees = res.data.employees;
            const availableEmplys = employees.map(employee => {
                if(employee.availability){
                    return { label:employee.name, value: employee.name }
                }
            })
            that.setState({
                employees:availableEmplys
            })
        }).catch(function(error){
            console.log(error);
        })
    
    }

    handleStationChange = (selectedOption) => {
        let joined = this.state.selectedStations.concat(selectedOption);
        
        this.setState({ 
            selectedStations:joined
        });
        console.log(`Option selected:`, selectedOption);
    }

    handleEmployeeChange = (selectedOption) => {
        let joined = this.state.selectedEmployees.concat(selectedOption);
        
        this.setState({ 
            selectedEmployees:joined
        });
        console.log(`Option selected:`, selectedOption);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const that = this;
        let bookings = that.state.bookings;
        let selectedEmployees = that.state.selectedEmployees;
        let selectedStations = that.state.selectedStations;
        let assignedBookings = new Array();

        console.log(selectedStations);

        for(let a=0; a<bookings.length; a++){
            const assignedObj = {
                booking:bookings[a],
                substation:selectedStations[a],
                employee:selectedEmployees[a]
            }
            assignedBookings.push(assignedObj);
        }
        console.log(assignedBookings);
        const bookingData = {
            assignedBookings:assignedBookings
        }
        
        //for loop for all bookings
        axios.put("http://localhost:3000/bookings/update",bookingData)
        .then(function(res){
            console.log("Booking assigned successfully!");
            alert("Booking assigned successfully!");
            that.setState({
                isAssignmentComplete:true
            })
        }).catch(function(error){
            console.log("Booking creation un-successful!\nError : ",error.response);
            alert("Booking creation un-successful!");
        })
      
    }

    render() {
        return (
            <div>
                <Navbar/>
                {
                   (this.state.isAssignmentComplete)?(
                       <Redirect to={'/assign'}/>
                   ):("")
                }
                <div className="booking-details">
                    <form>
                        <h1>Assign Substations and Employees</h1>
                        <table>
                            <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Vehicle No.</th>
                                <th>Vehicle Type</th>
                                <th>Substation</th>
                                <th>Employee</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.bookings && this.state.bookings.map(booking => 
                                    {
                                        return(
                                            <tr>
                                                <td class="center">
                                                    <p>{booking._id.substring(0,8)}</p> 
                                                </td>
                                                <td class="center">
                                                    <p>{booking.vehicleNo }</p>       
                                                </td>
                                                <td class="center">
                                                    <p>{booking.vehicleType }</p>       
                                                </td>
                                                <td class="center">
                                                    <Select options={ this.state.substations } onChange={this.handleStationChange} />
                                                </td>
                                                <td class="center">
                                                    <Select options={ this.state.employees } onChange={this.handleEmployeeChange} />
                                                </td>
                                            </tr>
                                        )
                                    })
                            }
                            </tbody>
                        </table>
                        <br/>
                        <button className="reserve-btn" type="button" onClick={this.handleSubmit}>Update</button>
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Assign;