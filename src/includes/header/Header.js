import React, { useContext } from 'react'
import './Header.css'
import { history } from '../../utils/history'
import * as CONSTANTS from '../../config/constants'
import { GlobalContext } from '../../context/GlobalState'

const Header = () => {
    
    // controle de "se está logado"
    const { setLoggedIn } = useContext(GlobalContext);

    const exitButton = () => {
        localStorage.setItem(CONSTANTS.CACHED_TOKEN_KEY, '');
        localStorage.setItem(CONSTANTS.LOGGED_USER_DATA_KEY, '');
        setLoggedIn(false);
        history.push('/login');
    };

    return (
        <>
                <div className='header-container'>
                    <span className='btn btn-light' 
                            onClick={exitButton}>
                        <i className="fas fa-power-off"></i>
                    </span>
                </div>
        </>
    )
}

export default Header;