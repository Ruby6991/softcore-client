import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignInAndJoin from './components/auth/SigninAndJoin.js'
import Bookings from './components/common/Bookings'
import CreateBooking from './components/common/CreateBooking';
import Assign from './components/common/Assign';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={SignInAndJoin}/>
            <Route exact path='/createBooking' component={CreateBooking}/>
            <Route exact path='/bookings' component={Bookings}/>
            <Route exact path='/assign' component={Assign}/>
          </Switch>
        </div>
      </BrowserRouter> 
    );
  }
}


export default App;
