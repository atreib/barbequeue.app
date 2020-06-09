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
import PatcherComponent from './../../utils/patcher/patcher'

const BarbequeDetails = () => {
    Moment.locale('br');
    const [bbqData, setBbqData] = useState({})
    const [totalBudget, setTotalBudget] = useState('0')
    const { setIsLoading, setPageTitle } = useContext(GlobalContext)
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY);
    const { id } = useParams();
    const [patcherParams, setPatchParams] = useState({})
    const [isPatching, setIsPatching] = useState(false)

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
                console.log("initial bbqData: ", bbqData)
                setBbqData(retorno.data)
                setIsLoading(false)
            }).catch((err) => {
                console.log("err.response: ", err.response)
                setIsLoading(false)
            })
        }
        loadBbq()
    }, [])

    useEffect(() => {
        console.log("bbqData: ", bbqData)
        if (bbqData && bbqData.participants) 
        {
            const newBudget = bbqData.participants.reduce((last, actual) => {
                    if (actual.paid)
                        last.contribution += actual.contribution
                    return last;
                }, {contribution: 0, paid: false})
                    .contribution
                    .toFixed(2)
                    .replace('.', ',')
            setTotalBudget(newBudget)
        }
        
    }, [bbqData])

    const changeDescription = () => {
        setPatchParams({
            propertyName: "description", 
            propertyValue: bbqData.description, 
            label: "Descrição", 
            type: "text" 
        })
        setIsPatching(true)
    }

    const changeEventDateTime = () => {
        setPatchParams({
            propertyName: "eventDateTime", 
            propertyValue: bbqData.eventDateTime.substring(0, bbqData.eventDateTime.indexOf('T')), 
            label: "Dia do churras", 
            type: "date" 
        })
        setIsPatching(true)
    }

    const callbackNewParticipant = (newParticipant) => {
        const copy = Object.assign([], bbqData.participants)
        copy.push(newParticipant)
        const aux = Object.assign({}, bbqData, { participants: copy })
        setBbqData(aux)
    }

    const callBackRemoveParticipant = (removedParticipant) => {
        const findParticipant = bbqData.participants.filter(x => x.id === removedParticipant.id)
        if (findParticipant) {
            const position = bbqData.participants.indexOf(findParticipant[0])
            const copy = Object.assign([], bbqData.participants)
            copy.splice(position, 1)
            const aux = Object.assign({}, bbqData, { participants: copy })
            setBbqData(aux)
        }
        else
        {
            window.location.reload()
        }
    }

    const callBackParticipantPaid = (participant, isPaid) => {
        const findParticipant = bbqData.participants.filter(x => x.id === participant.id)
        if (findParticipant) {
            const position = bbqData.participants.indexOf(findParticipant[0])
            const copy = Object.assign([], bbqData.participants)
            copy[position].paid = isPaid
            const aux = Object.assign({}, bbqData, { participants: copy })
            setBbqData(aux)
        }
        else
        {
            window.location.reload()
        }
    }

    const callBackParticipantContriburion = (participant, contribution) => {
        const findParticipant = bbqData.participants.filter(x => x.id === participant.id)
        if (findParticipant) {
            const position = bbqData.participants.indexOf(findParticipant[0])
            const copy = Object.assign([], bbqData.participants)
            copy[position].contribution = contribution
            const aux = Object.assign({}, bbqData, { participants: copy })
            setBbqData(aux)
        }
        else
        {
            window.location.reload()
        }
    }

    const patcherBackCallback = () => {
        setIsPatching(false)
    }

    const patcherConfirmCallback = (properyUpdated) => {
        setIsLoading(true)

        const newBbqData = Object.assign({}, bbqData, properyUpdated)
        setBbqData(newBbqData)

        const idUpdated = bbqData.id
        const { id, ...putData } = newBbqData;
        const action = `api/barbeque/${idUpdated}`;
        const params = { 
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        api.put(action, putData, params).then((retorno) => {
            setIsPatching(false)
            setIsLoading(false)
        }).catch((err) => {
            console.log("err.response: ", err.response)
            setIsPatching(false)
            setIsLoading(false)
        })
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
            { isPatching && 
                <PatcherComponent 
                    backCallback={patcherBackCallback}
                    confirmCallBack={patcherConfirmCallback}
                    properties={patcherParams} /> 
            }
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
                                    <h2 className="editable-label"
                                        onClick={changeEventDateTime}>
                                        { Moment(bbqData.eventDateTime).format('DD/MM') }
                                    </h2>

                                    <h1 className="editable-label"
                                        onClick={changeDescription}>
                                        {bbqData.description}
                                    </h1>
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
                                                R$ {totalBudget} 
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
                                                key={participant.id}
                                                sendBackPaid={callBackParticipantPaid}
                                                sendBackContributionUpdate={callBackParticipantContriburion}
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