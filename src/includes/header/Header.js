import React, { useContext } from 'react'
import './Header.css'
import { history } from '../../utils/history'
import * as CONSTANTS from '../../config/constants'
import { GlobalContext } from '../../context/GlobalState'

const Header = () => {
    
    // controle de "se está logado"
    const { setLoggedIn, pageTitle } = useContext(GlobalContext);

    const exitButton = () => {
        localStorage.setItem(CONSTANTS.CACHED_TOKEN_KEY, '');
        localStorage.setItem(CONSTANTS.LOGGED_USER_DATA_KEY, '');
        setLoggedIn(false);
        history.push('/login');
    };

    return (
        <>
            <div className='header-container'>
                <div className="header-wrapper">
                    <div className="header-options">
                        <span className='btn btn-danger' 
                            onClick={exitButton}>
                            <i className="fas fa-power-off"></i>
                            <label className="btn-label">Sair</label>
                        </span>
                    </div>

                    <div className="header-title">
                        <h1>{pageTitle}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;