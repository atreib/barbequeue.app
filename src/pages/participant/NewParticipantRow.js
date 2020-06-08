import React from 'react'
import './NewParticipantRow.css'

const ParticipantRow = () => {
    return (
        <>
            <div className='participant-helper'>
                <p>Inserir novo participante ao churras</p>
            </div>
            <div className='new-participant-row'>
                <div className='check'>
                    <i class="fas fa-plus-circle"></i>
                </div>
                <div className='name'>
                    Digite aqui o nome
                </div>
                <div className='contribution'>
                    R$ 0,00
                </div>
            </div>
        </>
    )
}

export default ParticipantRow