/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from 'react'
import './Login.css'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import api from "../../utils/api"
import { history } from '../../utils/history'
import * as CONSTANTS from '../../config/constants'
import { GlobalContext } from '../../context/GlobalState'
import { Helmet } from 'react-helmet'

const Login = () => { 
    
    const emptyForm = {
        usuario: "",
        password: ""
    };

    const validations = yup.object().shape({
        usuario: yup.string().required("*Campo obrigatório"),
        password: yup.string().min(3).required("*Campo obrigatório")
    });

    const { setLoggedIn, setIsLoading } = useContext(GlobalContext);
    
    useEffect(() => {
        setLoggedIn(false);
    }, []);

    const loginForm = (values) => {
        setIsLoading(true);

        const action = "api/authenticate";
        const data = {
            Username: values.usuario,
            Password: values.password
        };
        
        api.post(action, data).then((retorno) => {
            const { token, username, id } = retorno.data;
            // const userData = {
            //     id,
            //     username
            // };
            localStorage.setItem(CONSTANTS.CACHED_TOKEN_KEY, token);
            // localStorage.setItem(CONSTANTS.LOGGED_USER_DATA_KEY, btoa(JSON.stringify(userData)));
            setLoggedIn(true);
            setIsLoading(false);
            history.push("/");
        }).catch((err) => {
            console.log("err.response: ", err.response);
            setIsLoading(false);
        });
    }

    return (
        <>
            <Helmet>
                <title>BarbeQUEUE - Entrar</title>
            </Helmet>
            <div className="login-container">
                <img src='/logo.png' className="icon" alt="BarbeQUEUE" />

                <Formik initialValues={emptyForm} 
                        onSubmit={loginForm} 
                        validationSchema={validations}>
                    <Form className="login-form">
                        <div className="form-group mb-3 text-left">
                            <label htmlFor="usuario">Usuário</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <Field placeholder="Usuário"
                                        className="form-control"
                                        label="Usuário"
                                        name="usuario"
                                        margin="normal" />
                            </div>
                            <ErrorMessage className="form-text text-danger"
                                component="div"
                                name="usuario" />
                        </div>
                        <div className="form-group mb-3 text-left">
                            <label htmlFor="password">Senha</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                <Field placeholder="Senha"
                                        className="form-control"
                                        label="Senha"
                                        type="password"
                                        name="password" />
                            </div>
                            <ErrorMessage className="form-text text-danger"
                                component="div"
                                name="password" />
                        </div>
                        <div className="text-right">
                            <button className="btn btn-dark btn-block" type="submit">
                                Acessar
                            </button>
                        </div>
                    </Form>
                </Formik>    
            </div>
            <div className="copyright-container text-center">
                <img src="/trinca.png" alt="TRINCA LTDA" />
            </div>
        </>
    )
}

export default Login