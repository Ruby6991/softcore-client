import React, { Component } from 'react'
import ManagerLinks from './ManagerLinks'
import CustomerLinks from './CustomerLinks'

class Navbar extends Component {

    render() {
        return(
            <nav className="nav-extended">
                <div class="nav wrapper white">
                    <h4 class="blue-grey-text text-darken-4">Softcore Motors</h4>
                </div>
                <div class="nav wrapper">
                    {
                        localStorage.userType==="manager"?(
                            <ManagerLinks/>
                        ):(
                            <CustomerLinks/>
                        )
                    }
                    
                </div>
            </nav>   
        )
    }
    
}

export default Navbar;