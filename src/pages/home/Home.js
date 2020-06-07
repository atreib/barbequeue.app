import React from 'react'
import './Home.css'
import * as CONSTANTS from '../../config/constants'
// import { history } from '../../utils/history'
// import { GlobalContext } from '../../context/GlobalState'
import BarbequeCard from './Barbeque'
import { MOCK_BARBEQUE_LIST } from './../../__mocks__/barbeque'
import { Helmet } from 'react-helmet';

const Home = () => {

    var b64DadosUser = localStorage.getItem(CONSTANTS.LOGGED_USER_DATA_KEY);
    var sdadosUsuario = atob(b64DadosUser);
    var dadosUsuario = JSON.parse(sdadosUsuario);

    // testing the universal loader
    // const { setIsLoading } = useContext(GlobalContext);

    return (
        <>
            <Helmet>
                <style>{'body { background-color: #fafafa !important; }'}</style>
            </Helmet>
            <div className="home-container">
                <div className="cards-wrapper">
                    {
                        MOCK_BARBEQUE_LIST && 
                        MOCK_BARBEQUE_LIST.map(bbq => (
                            <BarbequeCard content={bbq} />
                        ))
                    }
                    { !MOCK_BARBEQUE_LIST && <h1>Sem bbqs</h1> }
                </div>
                <div className="footer-wrapper">
                    <img src='/logo.png' className="icon" alt="BarbeQUEUE" />
                    <img src="/trinca.png" className="copyright-icon" alt="TRINCA LTDA" />
                </div>
            </div>
        </>
    )
}

export default Home