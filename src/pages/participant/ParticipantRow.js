import React, { useContext } from 'react'
import './ParticipantRow.css'
import * as CONSTANTS from '../../config/constants'
import api from "../../utils/api"
import { GlobalContext } from '../../context/GlobalState'

const ParticipantRow = (props) => {
    const { setIsLoading } = useContext(GlobalContext)
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY)
    const participant = props.content;
    const updateList = props.sendBack;

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

    return (
        <>
            <div className='participant-row'>
                <div className='check'>
                    PAGO
                </div>
                <div className='name'>
                    <div>
                        <span onClick={removeParticipant}
                            class="btn btn-light btn-small btn-remover-part">
                            <i class="fas fa-times"></i>
                        </span>
                        {participant.name}
                    </div>
                </div>
                <div className='contribution'>
                    R$ {participant.contribution.toFixed(2).replace('.', ',')}
                </div>
            </div>
        </>
    )
}

export default ParticipantRow