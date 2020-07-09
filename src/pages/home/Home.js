import React, { useContext, useState, useEffect } from 'react'
import './Home.css'
import * as CONSTANTS from '../../config/constants'
import { GlobalContext } from '../../context/GlobalState'
import BarbequeCard from './../barbeque/BarbequeCard'
import NewBarbequeCard from './../barbeque/NewBarbequeCard'
import { Helmet } from 'react-helmet';
import api from "../../utils/api"

const Home = () => {
    const [bbqList, setBbqList] = useState([])
    const { setIsLoading, setPageTitle } = useContext(GlobalContext)
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY);

    useEffect(() => {
        setPageTitle("MINHA AGENDA")

        setIsLoading(true)
        const loadBbqs = () => {
            setIsLoading(true);
            const action = "api/barbeque";
            const params = { 
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
            api.get(action, params).then((retorno) => {
                setBbqList(retorno.data)
                setIsLoading(false)
            }).catch((err) => {
                console.log("err.response: ", err.response)
                setIsLoading(false)
            })
        }
        loadBbqs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <style>{'body { background-color: #fafafa !important; }'}</style>
            </Helmet>
            <div className="home-container">
                <div className="cards-wrapper">
                    <NewBarbequeCard />
                    {
                        bbqList && 
                        bbqList.map(bbq => (
                            <BarbequeCard key={bbq.id} content={bbq} />
                        ))
                    }
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