import React from 'react'
import './NewBarbequeCard.css'
import { history } from '../../utils/history'

const NewBarbequeCard = () => {
    const novoBbq = () => {
        history.push('/barbeque/form')
    }

    return (
        <>
            <div onClick={novoBbq} className="new-card-container">
                <div>
                    <h1>
                        <i className="fas fa-drumstick-bite"></i>
                    </h1>
                    <h2>Marcar um churras</h2>
                </div>
            </div>
        </>
    )
}

export default NewBarbequeCard