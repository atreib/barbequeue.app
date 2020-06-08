import React, { useContext } from 'react';
import './Layout.css';
import Header from './header/Header'
import { GlobalContext } from '../context/GlobalState'
import ShowLoader from '../utils/loader';

const Layout = (props) => {
    const { isLoading, isLoggedIn } = useContext(GlobalContext);

    return (
        <>
            {isLoading && <ShowLoader />}
            <div>
                <div>
                    { isLoggedIn && <Header /> }
                </div>
                <div>
                    { props.children }
                </div>
            </div>
        </>
    )
};

export default Layout;