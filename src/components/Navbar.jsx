import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = ({ onHeightChange }) => {
    const navbarRef = useRef(null);
    const navigate = useNavigate();

    const moveToHome= () => {
        navigate('/');
    }

    const moveToAppointment= () => {
        navigate('/appointment');
    }

    const moveToTreatment= () => {
        navigate('/treatment');
    }

    const moveToLogin = () => {
        navigate('/login');
    }

    useEffect(() => {
        const updateNavbarHeight = () => {
          if (navbarRef.current) {
            onHeightChange(navbarRef.current.offsetHeight);
          }
        };
    
        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);

        return () => {
          window.removeEventListener('resize', updateNavbarHeight);
        };
      }, [onHeightChange]);

    return (
        <div ref={navbarRef} className='nav'>
            <div className="nav-logo"> 원격진료시스템 by ADAS</div>
            <ul className="nav-menu">
                <li className="nav-home" onClick={moveToHome}>홈</li>
                <li className="nav-appointment" onClick={moveToAppointment}>예약</li>
                <li className="nav-treatment" onClick={moveToTreatment}>진료</li>
                <li className="nav-login" onClick={moveToLogin}>로그인</li>  
            </ul>
        </div>
    );
}

export default Navbar;
