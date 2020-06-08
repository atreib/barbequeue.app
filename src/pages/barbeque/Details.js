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

    const callbackNewParticipant = (newParticipant) => {
        const copy = bbqData.participants
        copy.push(newParticipant)
        bbqData.participants = copy
        setBbqData(bbqData)
    }

    const callBackRemoveParticipant = (removedParticipant) => {
        const position = bbqData.participants.indexOf(removedParticipant)
        const copy = bbqData.participants
        copy.splice(position, 1)
        bbqData.participants = copy
        setBbqData(bbqData)
    }

    const btnVoltar = () => {
        history.push('/')
    }

    const btnRemoveBbq = () => {
        const remove = window.confirm("Tem certeza que você deseja cancelar este churras?")
        if (remove) {
            setIsLoading(true);
            const action = `api/barbeque/${id}`;
            const params = { 
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
            api.delete(action, params).then((retorno) => {
                console.log("retorno.data: ", retorno.data)
                setIsLoading(false)
                history.push('/')
            }).catch((err) => {
                console.log("err.response: ", err.response)
                setIsLoading(false)
            })
        }
    }

    return (
        <>
            <Helmet>
                <title>BarbeQUEUE - Sobre o churras</title>
                <style>{'body { background-color: #fafafa !important; }'}</style>
            </Helmet>
            <div className="bbq-container">
                <div className="cards-wrapper">
                    <div className="options-wrapper">
                        <span onClick={btnRemoveBbq} className="btn btn-danger">
                        <i className="fas fa-heart-broken"></i> Cancelar o churras
                        </span>
                        <span onClick={btnVoltar} className="btn btn-dark">
                            <i className="fas fa-undo"></i> Voltar
                        </span>
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
                                <NewParticipantRow 
                                    sendBack={callbackNewParticipant} 
                                    content={bbqData.id} />
                                { 
                                    bbqData.participants && 
                                    bbqData.participants.map((participant) => {
                                        return (
                                            <ParticipantRow 
                                                sendBack={callBackRemoveParticipant}
                                                content={participant} />
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