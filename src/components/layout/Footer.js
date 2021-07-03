import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">SoftCore Motors</h5>
                <p class="grey-text text-lighten-4">EASY ONLINE SCHEDULING FOR AUTO SERVICES
                </p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><NavLink to='/'>Contact Us</NavLink></li>
                  <li><NavLink to='/'>FAQ</NavLink></li>
                  <li><NavLink to='/'>About</NavLink></li>
                  <li><NavLink to='/'>Help</NavLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2020  SoftCore Motore Ltd.
            </div>
          </div>
        </footer>
    )
}

export default Footer;