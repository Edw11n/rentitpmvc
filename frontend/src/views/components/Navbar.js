import React from 'react';
import '../../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavbarController from '../../controllers/navbarController';

function Navbar({ goToJoin, setShowAccount }) {
    const { user, goToHome, handleUserClick } = NavbarController(setShowAccount, goToJoin); // Utiliza el controlador

    return (
        <nav className='navbar'>
            <h1 className='title' onClick={goToHome}>CampusHousing Mocoa</h1>
            {!user ? (
                <div className='navbar-join'>
                    <p className='navbar-join-click' onClick={goToJoin}>Eres propietario?</p>
                </div>
            ) : (
                <div className='dash'>
                    <FontAwesomeIcon icon={faUser} onClick={handleUserClick} />
                </div>
            )}
        </nav>
    );
}

export default Navbar;
