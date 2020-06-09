import React, { useContext, useState } from 'react'
import './ParticipantRow.css'
import './../../utils/checkbox.css'
import * as CONSTANTS from '../../config/constants'
import api from "../../utils/api"
import { GlobalContext } from '../../context/GlobalState'
import PatcherComponent from './../../utils/patcher/patcher'

const ParticipantRow = (props) => {
    const { setIsLoading } = useContext(GlobalContext)
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY)
    const participantProp = props.content
    const updateList = props.sendBack
    const updateListBudget = props.sendBackPaid
    const [isChecked, setIsChecked] = useState(participantProp.paid)
    const [participant, setParticipant] = useState(participantProp)
    const [patcherParams, setPatchParams] = useState({})
    const [isPatching, setIsPatching] = useState(false)

    const patcherCancelCallback = () => {
        setIsPatching(false)
    }

    const patcherConfirmCallback = (properyUpdated) => {
        setIsLoading(true)

        const newParticipantData = Object.assign({}, participant, properyUpdated)
        setParticipant(newParticipantData)

        const idUpdated = participant.id
        delete newParticipantData.id
        const action = `api/participants/${idUpdated}`;
        const params = { 
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        api.put(action, newParticipantData, params).then((retorno) => {
            setIsPatching(false)
            setIsLoading(false)
        }).catch((err) => {
            console.log("err.response: ", err.response)
            setIsPatching(false)
            setIsLoading(false)
        })
    }

    const changeParticipantName = () => {
        setPatchParams({
            propertyName: "name", 
            propertyValue: participant.name, 
            label: "Nome", 
            type: "text" 
        })
        setIsPatching(true)
    }

    const changeContribution = () => {
        setPatchParams({
            propertyName: "contribution", 
            propertyValue: participant.contribution, 
            label: "Contribuição", 
            type: "number" 
        })
        setIsPatching(true)
    }

    const removeParticipant = () => {
        const conf = window.confirm("Você deseja mesmo remover este participante?");
        if (conf) {
            const id = participant.id
            setIsLoading(true);
            const action = `api/participants/${id}`;
            const params = { 
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
            api.delete(action, params).then((retorno) => {
                updateList(participant)
                setIsLoading(false)
            }).catch((err) => {
                setIsLoading(false)
            })
        }
    }

    const pay = (e) => {
        setIsLoading(true);
        const isPaid = !isChecked
        const paidData = Object.assign({}, participant, { paid: isPaid })
        delete paidData.id
        const id = participant.id
        const action = `api/participants/${id}`
        const params = { 
        headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        api.put(action, paidData, params).then((retorno) => {
            updateListBudget(participant, isPaid)
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
        })
    }

    return (
        <>
            { 
                isPatching && 
                <PatcherComponent 
                    backCallback={patcherCancelCallback}
                    confirmCallBack={patcherConfirmCallback}
                    properties={patcherParams} /> 
            }
            <div className='participant-row'>
                <div className='check'>
                    <span className="checkboxWrapper">
                        <input type="checkbox" 
                                id={participant.id} 
                                checked={isChecked}
                                onChange={() => {
                                    setIsChecked(!isChecked)
                                }}
                                onClick={pay} />
                        <label htmlFor={participant.id}>Pago</label>
                    </span>
                </div>
                <div className='name'>
                    <div>
                        <span onClick={removeParticipant}
                            className="btn btn-light btn-small btn-remover-part">
                            <i className="fas fa-times"></i>
                        </span>
                        <span className="editable-label"
                                onClick={changeParticipantName}>
                            {participant.name}
                        </span>
                    </div>
                </div>
                <div className='contribution'>
                    <span className="editable-label"
                        onClick={changeContribution}>
                        R$ {participant.contribution.toFixed(2).replace('.', ',')}
                    </span>
                </div>
            </div>
        </>
    )
}

export default ParticipantRow