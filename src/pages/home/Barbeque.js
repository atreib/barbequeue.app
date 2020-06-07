import React from 'react'
import './Barbeque.css'
import Moment from 'moment';

const BarbequeCard = (props) => {
    console.log("props: ", props);
    const bbq = props.content;
    Moment.locale('br');

    return (
        <>
            <div className="card-container">
                <h2>{ Moment(bbq.eventDateTime).format('DD/MM') }</h2>
                <p>{bbq.description}</p>
                <div className="details">
                    <div className="participants">
                        <i class="fas fa-user-friends"></i> 
                        { bbq.participants 
                            && <span> {bbq.participants.length}</span>}
                        { !bbq.participants 
                            && <span> 0</span>}
                    </div>
                    <div className="budget">
                        <i class="fas fa-dollar-sign"></i>
                        { bbq.participants 
                            && <span> R${bbq.participants.reduce((last, actual) => {
                                console.log("last.contribution: ", last.contribution)
                                console.log("actual.contribution: ", actual.contribution)
                                last.contribution += actual.contribution
                                return last;
                            }, {contribution: 0}).contribution} </span> }
                        { !bbq.participants 
                            && <span> R$0,00 </span> }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BarbequeCard