import React, { useState, useContext } from 'react'
import './NewParticipantRow.css'
import * as CONSTANTS from '../../config/constants'
import api from "../../utils/api"
import { GlobalContext } from '../../context/GlobalState'

const NewParticipantRow = (props) => {
    const { setIsLoading } = useContext(GlobalContext)
    const [name, setName] = useState("")
    const [contribution, setContribution] = useState(10.00)
    const idBbq = props.content;
    const sendToList = props.sendBack;
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY)
    
    const btnInsert = () => {
        setIsLoading(true);
        const action = `api/participants`;
        const params = { 
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        const data = {
            Name: name,
            Contribution: contribution,
            BarbequeId: idBbq,
            Paid: false
        }
        api.post(action, data, params).then((retorno) => {
            sendToList(retorno.data)
            setIsLoading(false)
        }).catch((err) => {
            console.log("err.response: ", err.response)
            setIsLoading(false)
        })
    }

    return (
        <>
            <div className='new-participant-row'>
                <div className='check'>
                    <span onClick={btnInsert} 
                        className="btn btn-dark">
                        <i className="fas fa-plus-circle"></i>
                    </span>
                </div>
                <div className='name'>
                    <div className="form-group text-left">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                            <input type="text"
                                    value={name}
                                    onChange={(e) => setName(e.currentTarget.value)}
                                    placeholder="Digite aqui o nome"
                                    className="form-control"
                                    name="name" />
                        </div>
                    </div>
                </div>
                <div className='contribution'>
                    <div className="form-group text-left">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-dollar-sign"></i>
                                </span>
                            </div>
                            <input type="number"
                                    value={contribution}
                                    onChange={(e) => {
                                        return setContribution(
                                            Number(Number(e.currentTarget.value
                                                .replace(",",".")).toFixed(2))
                                        )
                                    }}
                                    min="0.01" 
                                    step="0.01"
                                    className="form-control"
                                    name="contribution" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewParticipantRow