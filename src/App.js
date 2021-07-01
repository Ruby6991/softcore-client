import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignInAndJoin from './components/auth/SigninAndJoin.js'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={SignInAndJoin}/>
          </Switch>
        </div>
      </BrowserRouter> 
    );
  }
}


export default App;
