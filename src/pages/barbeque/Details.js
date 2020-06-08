import React, { useContext, useState, useEffect } from 'react'
import './Details.css'
import { Helmet } from 'react-helmet'
import api from "../../utils/api"
import * as CONSTANTS from '../../config/constants'
import { GlobalContext } from '../../context/GlobalState'
import { useParams } from "react-router-dom"
import { history } from '../../utils/history'
import { ParticipantRow, NewParticipantRow } from './../participant'
import Moment from 'moment'

const BarbequeDetails = () => {
    Moment.locale('br');
    const [bbqData, setBbqData] = useState({})
    const { setIsLoading, setPageTitle } = useContext(GlobalContext)
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY);
    const { id } = useParams();

    useEffect(() => {
        setPageTitle("SOBRE O CHURRAS")
        setIsLoading(true)

        const loadBbq = () => {
            setIsLoading(true);
            const action = `api/barbeque/${id}`;
            const params = { 
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
            api.get(action, params).then((retorno) => {
                console.log("retorno.data: ", retorno.data)
                setBbqData(retorno.data)
                setIsLoading(false)
            }).catch((err) => {
                console.log("err.response: ", err.response)
                setIsLoading(false)
            })
        }
        loadBbq()
    }, [])

    const btnVoltar = () => {
        history.push('/')
    }

    return (
        <>
            <Helmet>
                <style>{'body { background-color: #fafafa !important; }'}</style>
            </Helmet>
            <div className="bbq-container">
                <div className="cards-wrapper">
                    <div className="options-wrapper" onClick={btnVoltar}>
                        <span className="btn btn-danger">Voltar</span>
                    </div>
                    { bbqData && 
                        <div className="bbq-wrapper">
                            <div className="header">
                                <div className='esquerda'>
                                    <h2>{ Moment(bbqData.eventDateTime).format('DD/MM') }</h2>
                                    <h1>{bbqData.description}</h1>
                                </div>
                                <div className='direita'>
                                    <h3>
                                        <i className="fas fa-user-friends"></i> 
                                        { bbqData.participants 
                                            && <span>{bbqData.participants.length}</span>}
                                        { !bbqData.participants 
                                            && <span>0</span>}
                                    </h3>
                                    <h3>
                                        <i className="fas fa-dollar-sign"></i>
                                        { 
                                            bbqData.participants && 
                                            <span> 
                                                R$ {bbqData.participants.reduce((last, actual) => {
                                                    last.contribution += actual.contribution
                                                    return last;
                                                }, {contribution: 0})
                                                    .contribution
                                                    .toFixed(2)
                                                    .replace('.', ',')} 
                                            </span> 
                                        }
                                        { !bbqData.participants 
                                            && <span> R$0,00 </span> }
                                    </h3>
                                </div>
                            </div>
                            <div className="body">
                                <NewParticipantRow />
                                { 
                                    bbqData.participants && 
                                    bbqData.participants.map((participant) => {
                                        return (
                                            <ParticipantRow content={participant} />
                                        )
                                    }) 
                                }
                            </div>
                        </div>
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

export default BarbequeDetails