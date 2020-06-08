import React from 'react'
import './BarbequeCard.css'
import Moment from 'moment'
import { history } from '../../utils/history'

const BarbequeCard = (props) => {
    const bbq = props.content;
    Moment.locale('br');

    const btnDetails = (id) => {
        history.push(`/barbeque/${id}`)
    }

    return (
        <>
            <div className="card-container" onClick={() => btnDetails(bbq.id)}>
                <h2>{ Moment(bbq.eventDateTime).format('DD/MM') }</h2>
                <p>{bbq.description}</p>
                <div className="details">
                    <div className="participants">
                        <i className="fas fa-user-friends"></i> 
                        { bbq.participants 
                            && <span> {bbq.participants.length}</span>}
                        { !bbq.participants 
                            && <span> 0</span>}
                    </div>
                    <div className="budget">
                        <i className="fas fa-dollar-sign"></i>
                        { bbq.participants 
                            && <span> R${bbq.participants.reduce((last, actual) => {
                                last.contribution += actual.contribution
                                return last;
                            }, {contribution: 0}).contribution.toFixed(2).replace('.', ',')} </span> }
                        { !bbq.participants 
                            && <span> R$0,00 </span> }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BarbequeCard