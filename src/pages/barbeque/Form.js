/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from 'react'
import './Form.css'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import api from "../../utils/api"
import { history } from '../../utils/history'
import * as CONSTANTS from '../../config/constants'
import { GlobalContext } from '../../context/GlobalState'
import Moment from 'moment'
import { useParams } from "react-router-dom"

const BarbequeForm = () => { 
    Moment.locale('br');
    const jwt = localStorage.getItem(CONSTANTS.CACHED_TOKEN_KEY);
    const { setIsLoading, setPageTitle } = useContext(GlobalContext);
    const { id } = useParams();

    const emptyForm = {
        description: "",
        eventDateTime: Moment()
    };

    const validations = yup.object().shape({
        description: yup.string().required("*Campo obrigatório"),
        eventDateTime: yup.string().min(10).required("*Campo obrigatório")
    });

    const confirmForm = (values) => {
        setIsLoading(true);

        const action = "api/barbeque";
        const data = {
            description: values.description,
            eventDateTime: values.eventDateTime
        };
        const params = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        api.post(action, data, params).then((retorno) => {
            console.log("retorno.data: ", retorno.data);
            setIsLoading(false);
            history.push('/')
        }).catch((err) => {
            console.log("err.response: ", err.response);
            setIsLoading(false);
        });
    }

    const backButton = () => {
        history.push('/')
    }

    useEffect(() => {
        setPageTitle("NOVO CHURRAS")
    }, [])

    return (
        <>
            <div className="bbq-form-container">
                <div className="options">
                    <span class="btn btn-danger" onClick={backButton}>
                        Voltar
                    </span>
                </div>
                <Formik initialValues={emptyForm} 
                        onSubmit={confirmForm} 
                        validationSchema={validations}>
                    <Form>
                        <div className="form-group mb-3 text-left">
                            <label htmlFor="description">Nome do evento</label>
                            <div className="input-group">
                                <Field placeholder="Nome do evento"
                                        className="form-control"
                                        label="Nome do evento"
                                        name="description"
                                        margin="normal" />
                            </div>
                            <ErrorMessage className="form-text text-danger"
                                component="div"
                                name="description" />
                        </div>
                        <div className="form-group mb-3 text-left">
                            <label htmlFor="eventDateTime">Dia do churras</label>
                            <div className="input-group">
                                <Field placeholder="Dia do churras"
                                        className="form-control"
                                        label="Dia do churras"
                                        type="date"
                                        name="eventDateTime" />
                            </div>
                            <ErrorMessage className="form-text text-danger"
                                component="div"
                                name="eventDateTime" />
                        </div>
                        <div className="text-right">
                            <button className="btn btn-dark btn-block" type="submit">
                                Marcar churras
                            </button>
                        </div>
                    </Form>
                </Formik>    
            </div>
        </>
    )
}

export default BarbequeForm