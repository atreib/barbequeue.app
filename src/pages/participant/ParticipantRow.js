import React from 'react'
import './ParticipantRow.css'

const ParticipantRow = (props) => {
    const participant = props.content;
    console.log("participant: ", participant)

    return (
        <>
            <div className='participant-row'>
                <div className='check'>
                    PAGO
                </div>
                <div className='name'>{participant.name}</div>
                <div className='contribution'>
                    R$ {participant.contribution.toFixed(2).replace('.', ',')}
                </div>
            </div>
        </>
    )
}

export default ParticipantRow