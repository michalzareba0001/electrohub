import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../../Assets/ef-logo.webp'
import loginIcon from '../../Assets/login.svg'
import cartIcon from '../../Assets/shopping-bag.svg'



const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='page-logo'>
                <img src={logo} alt='electro hub logo' />
                <h1><span className='yellow'>ELECTRO</span> HUB</h1>

            </div>
            <div className='main-menu'>
                <ul>
                    <li> <Link to='/' className='nav-link'>Strona główna</Link></li>
                    <li> <Link to='/shop' className='nav-link'>Sklep</Link></li>
                    <li> <Link to='/aboutus' className='nav-link'>O nas</Link></li>
                    <li> <Link to='/contact' className='nav-link'>Kontakt</Link></li>
                </ul>

            </div>
            <div className='user-panel'>
                <Link to='/login' className='nav-link'><img src={loginIcon} alt='login' className='login-icon'/></Link>
                <Link to='/cart' className='nav-link'><img src={cartIcon} alt='cart' className='cart-icon'/></Link>
            </div>

        </div >
    )
}

export default Navbar