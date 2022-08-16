import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import {Navigate} from 'react-router-dom';
import { Link } from "react-router-dom";
const axios = require("axios");

function Login(props)
{   
    document.title = 'Login';
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [logged, setLogin] = useState("");
    const [errorLoginMessage, setErrorMessage] = useState("")
    const [loginError, setError] = useState(false)

    async function loginBack()
    {
        let user = {email, 'password': senha}

        try
        {
            let request = await axios.post(
                `${props.api}api/login/`,
                user,
                { withCredentials: true }
            )
            console.log(request.headers)
            setError(false)
            window.location.href = '/';
        }
        catch (err)
        {
            if(err.response.status == 403)
            {
                setError(true)
                setErrorMessage(err.response.data.detail)
            }
            else
            {
                setError(true)
                setErrorMessage(err.message)
            }
        }
    }

    function checkLogin()
    {
        axios.get(
            `${props.api}api/me/`,
            { withCredentials: true }
        )
        .then((response) => {
            setLogin(true)
        },[])
        .catch((err) =>{
            setLogin(false)
        })
    }

    const onChangeSenha = (event) =>
    {
        setSenha(event.target.value)
    }

    const onChangeEmail = (event) =>
    {
        setEmail(event.target.value)
    }


    useEffect(() => {
        checkLogin();
      }, [])
    
    return(
        <div className="container loginForm">
            {logged?
                <Navigate to="/" />
                : null}
            <h2>Login</h2>
            <Form>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Digite o email" value={email} onChange={onChangeEmail}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite a senha" onChange={onChangeSenha}/>
                        </Form.Group>
                    </Col>
                </Row>
                {loginError?
                    <Row className="justify-content-md-center">
                    <Col sm={6}>
                        <Alert key='danger' variant='danger'>
                            {errorLoginMessage}
                        </Alert>
                    </Col>
                </Row>
                : null}

                <div className="text-center">  
                    <Button className="formButton" variant="success" onClick={loginBack}>Login</Button>{' '}
                </div>
                <br />
                <p><Link to='/clientes'> ou criar nova conta</Link></p>
            </Form>

        </div>
    )
}

export default Login;