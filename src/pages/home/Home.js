import React, { useContext } from 'react'
import './Home.css'
import * as CONSTANTS from '../../config/constants'
import { history } from '../../utils/history'
import { GlobalContext } from '../../context/GlobalState'

const Home = () => {

    var b64DadosUser = localStorage.getItem(CONSTANTS.LOGGED_USER_DATA_KEY);
    var sdadosUsuario = atob(b64DadosUser);
    var dadosUsuario = JSON.parse(sdadosUsuario);

    // testing the universal loader
    const { setIsLoading } = useContext(GlobalContext);

    return (
        <>
            { dadosUsuario.username }
        </>
    )
}

export default Home