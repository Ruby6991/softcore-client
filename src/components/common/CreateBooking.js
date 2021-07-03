import React, { Component } from 'react'
import M from "materialize-css"
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import TimeKeeper from 'react-timekeeper';
const axios = require("axios")

class CreateBooking extends Component {
    constructor(props){
        super(props);
        this.state={
            vehicleNo:'',
            vehicleType:'',
            model:'',
            mileage:'',
            startTime:'',
            endTime:'',
            notes:'',
            bookings:[],
            date:'',
            substations:[],
            isBookingComplete:false
        }
        this.onStartTimeChange = this.onStartTimeChange.bind(this);
        this.onEndTimeChange = this.onEndTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    componentDidMount(){
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onDateChange = (value, event) => {
        let date = value;
        this.setState({
            date: date
        }, () => {
            console.log(this.state);
        })
    }

    onStartTimeChange = (time) => {
        this.setState({
            startTime: time.formatted24
        })
    }

    onEndTimeChange = (time) => {
        this.setState({
            endTime: time.formatted24
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const that = this;
        
        let pickTime=this.state.startTime.split(":");
        let dropTime=this.state.endTime.split(":");

        //Appointment can only be made during working hours
        if(pickTime[0]<8 || pickTime[0]>18){
            alert("Please Pick a Start Time between 8.00 a.m. and 6.00 p.m.");
            return;
        }else if(dropTime[0]<8 || dropTime[0]>18){
            alert("Please Pick a End Time between 8.00 a.m. and 6.00 p.m.");
            return;
        }

        let splitDate= this.state.date.toISOString().split("T");
        let startDate = new Date(splitDate[0]);
        startDate.setDate(startDate.getDate()+1);
        splitDate= startDate.toISOString().split("T");
        let startDateTime = new Date(Date.parse(splitDate[0] + ' ' + this.state.startTime));
        let endDateTime = new Date(Date.parse(splitDate[0] + ' ' + this.state.endTime));

        const bookingData = {
            vehicleNo:this.state.vehicleNo,
            vehicleType:this.state.vehicleType,
            model:this.state.model,
            mileage:this.state.mileage,
            startTime:startDateTime,
            endTime:endDateTime,
            notes:this.state.notes,
            status:'pending'
        }

        const data = {
            dateCheck:startDateTime
        }

        if(data.dateCheck!==''){
            axios.post("http://localhost:3000/bookings/perday",data)
            .then(function(res){
                console.log(res.data);

                const bookings = res.data.bookings;
                console.log(bookings);

                if(bookings.length<10){
                    if(bookingData.vehicleType==="HEAVY"){
                        let heavySlots = 2;
                        for(let a=0; a<bookings.length; a++){
                            console.log(bookings[a]);
                            if(bookings[a].vehicleType==="HEAVY"){
                                heavySlots--;
                            }
                        }
                        if(heavySlots===0){
                            console.log("Sorry.Slots for Heavy Vehicles are Full");
                            alert("Sorry.Slots for Heavy Vehicles are Full");
                            return;
                        }else{
                            //create booking for heavy vehicle
                            axios.post("http://localhost:3000/bookings/confirm",bookingData)
                            .then(function(res){
                                console.log("Booking created successfully!");
                                alert("Booking created successfully!");
                                that.setState({
                                    isBookingComplete:true
                                })
                                return;
                            }).catch(function(error){
                                console.log("Booking creation un-successful!\nError : ",error.response);
                                alert("Booking creation un-successful!");
                            })
                        }
        
                        
        
                    }else{
                        console.log(bookingData);
                        axios.post("http://localhost:3000/bookings/confirm",bookingData)
                            .then(function(res){
                                console.log("Booking created successfully!");
                                alert("Booking created successfully!");
                                that.setState({
                                    isBookingComplete:true
                                })
                            }).catch(function(error){
                                console.log("Booking creation un-successful!\nError : ",error.response);
                                alert("Booking creation un-successful!");
                            })
                    }
                }else{
                    console.log("All slots are full for the selected date");
                    alert("All slots are full for the selected date");
                }

            }).catch(function(error){
                console.log(error);
            })
        }


    }

    render() {
        return (
            <div>
                <Navbar/>
                {
                   this.state.isBookingComplete?(
                        window.location.reload()
                   ):("")
                }
                <div className="booking-details">
                    <form>
                        <h1>Create Appointment</h1>
                        <div className="field-sets">
                            <fieldset>
                                <legend><span class="number">1</span> Appointment Details </legend>
                                <div className="row-info">
                                    <div className="row">
                                        <label>Date</label>
                                        <Calendar
                                        onChange={this.onDateChange}
                                        />
                                    </div>
                                </div>
                                <div className="row-info">
                                    <div className="row">
                                        <label for="time">Start Time</label>
                                        <TimeKeeper
                                            onChange={this.onStartTimeChange}
                                        />
                                    </div>
                                    <div className="row">
                                        <label for="time">End Time</label>
                                        <TimeKeeper
                                            onChange={this.onEndTimeChange}
                                        />
                                    </div>
                                </div>
                                
                                <legend><span class="number">2</span>Vehicle Details</legend> 

                                <div className="row-info">
                                    <div className="row">
                                        <label for="vehicleNo">Vehicle Number</label>
                                        <input id="vehicleNo" name="vehicle_No" type="text" class="validate" onChange={this.handleChange}/>
                                    </div>
                                    <div className="row">
                                        <label for="vehicleType">Vehicle Type</label>
                                        <input id="vehicleType" name="vehicle_Type" type="text" class="validate" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="row-info">
                                    <div className="row">
                                        <label for="model">Model</label>
                                        <input id="model" name="model"  type="text" class="validate" onChange={this.handleChange}/>
                                    </div>
                                    <div className="row">
                                        <label for="mileage">Mileage</label>
                                        <input id="mileage" name="mileage" type="number" class="validate"  onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <label for="notes">Service Notes</label>
                                <input type="text" id="notes" name="notes"  placeholder="Service Notes " onChange={this.handleChange}/>
                            </fieldset>
                        </div>
                        <button className="reserve-btn" type="button" onClick={this.handleSubmit}>Confirm Appointment</button>
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default CreateBooking;