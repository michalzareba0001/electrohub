import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/ef-logo.webp'
import './Footer.css'

const footer = () => {
  return (
    <div className='footer'>
      <div className='footer-top'>
        <div className='left'>
          <Link to='/' alt='home page' className='page-logo-link'>
            <div className='page-logo'>
              <img src={logo} alt='electro hub logo' />
              <h1><span className='yellow'>ELECTRO</span> HUB</h1>

            </div>
          </Link>
        </div>
        <div className='middle'>
                <h3>Menu:</h3>
                <ul>
                    <li> <Link to='/' className='footer-nav-link'>Strona główna</Link></li>
                    <li> <Link to='/shop' className='footer-nav-link'>Sklep</Link></li>
                    <li> <Link to='/aboutus' className='footer-nav-link'>O nas</Link></li>
                    <li> <Link to='/contact' className='footer-nav-link'>Kontakt</Link></li>
                </ul>

        </div>
        <div className='right'>
          <h3>Kontakt:</h3>
          <p>ulica testowa 33<br/>
          00-001 Testowo</p>
          <a href='tel:0048555555555' alt='numer telefonu' className='footer-phone'>Tel: +48 555 555 555</a><br/>
          <a href='mailto:test@testowo.pl' alt='adres e-mail' className='footer-mail'>E-mail: test@testowo.pl</a>

        </div>
      </div>
      <div className='footer-bottom'>
        <h5>Copyright © 2023. All rights reserved</h5>
        <h5>Design and implementation: Michał Zaręba</h5>
      </div>
    </div>
  )
}

export default footer