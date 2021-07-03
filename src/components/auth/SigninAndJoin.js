import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class SignInAndJoin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            firstName:'',
            lastName:'',
            password:'',
            userType:'',
            redirectToHome:false,
            redirectToRegister:false
        }
    }
    

    componentDidMount(){
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmitSignIn = (e) => {
        e.preventDefault();
        console.log(this.state);

        const login = {
            email:this.state.email,
            password:this.state.password
        }
        const that = this;
        if(login.email!=='' && login.password!==''){
        axios.post("http://localhost:3000/users/authenticate",login)
        .then(function(res){
            const data = res.data;
            console.log(data);

            if(res.data.message.includes("Password incorrect") ){
                alert("Password incorrect. Please Try Again");
                return;
            }else if(res.data.message.includes("No User Found!") ){
                alert("User Doesn't Exist!");
                return;
            }

            localStorage.setItem("token",data.token);
            localStorage.setItem("email",that.state.email);
            localStorage.setItem("userType",data.userType);
            that.setState({
                redirectToHome:true
            })
            console.log(localStorage);
        }).catch(function(error){
            const res = error.response;
            console.log(res);
        })
        }else{
            alert("Please Fill in all the fields")
        } 
    }

    handleSubmitSignUp = (e) => {
        e.preventDefault();
        console.log(this.state);
        const login = {
            email:this.state.email,
            password:this.state.password
        };
        const user = {
            email:this.state.email,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            password:this.state.password,
            userType:'customer'
        }
        console.log(user);

        const that = this;
        if(user.firstName!=='' && user.lastName!=='' && user.email!=='' && user.password!==''){
            axios.post("http://localhost:3000/users/register",user)
            .then(function(res){
                alert("Registered Successfully!");
                console.log(login);
                axios.post("http://localhost:3000/users/authenticate",login)
                .then(function(res){
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("email",that.state.email);
                    localStorage.setItem("userType",res.data.userType);
                    that.setState({
                        redirectToHome:true
                    })
                })
            }).catch(function(error){
                const res = error.response;
                console.log(res);
            })
        }else{
            alert("Please Fill in all the fields")
        }  
    }

    render() {
        return (
            <div className="outer-container">
                {
                   this.state.redirectToHome?(
                       <Redirect to="/createBooking"/>
                   ):("")
                }
                <div class="container-starter" id="container">
                    <div class="form-container sign-up-container">
                        <form onSubmit={this.handleSubmitSignUp} >
                            <h1>Create Account</h1>
                            <input type="email" placeholder="Email" id="email" onChange={this.handleChange}/>
                            <input type="text" placeholder="First Name" id="firstName" onChange={this.handleChange}/>
                            <input type="text" placeholder="Last Name" id="lastName" onChange={this.handleChange}/>
                            <input type="password" placeholder="Password" id="password" onChange={this.handleChange} />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div class="form-container sign-in-container">
                        <form onSubmit={this.handleSubmitSignIn} >
                            <h1>Sign in</h1>
                            <input type="email" placeholder="Email" id="email" onChange={this.handleChange} />
                            <input type="password" placeholder="Password" id="password" onChange={this.handleChange}/>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div class="overlay-container">
                        <div class="overlay">
                            <div class="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>Login and start making appointments to service your vehicles</p>
                                <button class="ghost" id="signIn">Sign In</button>
                            </div>
                            <div class="overlay-panel overlay-right">
                                <h1>SoftCore motors</h1>
                                <p>New Here? Sign up with us to make appointments to service your vehicles</p>
                                <button class="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInAndJoin;