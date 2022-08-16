import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import {Navigate} from 'react-router-dom';
const axios = require("axios");

function Ordem(props)
{
    const [problema, setProblema] = useState("")
    const [imagem, setImagem] = useState("")
    const [logged, setLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setError] = useState(false)

    function checkLogin()
    {
        axios.get(
            `${props.api}api/me/`,
            { withCredentials: true }
        )
        .then((response) => {
            setLogin(true)
        },[])
        .catch((err) =>
        {
            setLogin(false)
        })
    }

    useEffect(() => {
        checkLogin();
      }, [])


    const onChangeProblema = (event) =>
    {
        setProblema(event.target.value)
    }

    const onChangeFile = (event) => {
        setImagem(event.target.files[0]);
    };

    async function enviarOrdem()
    {   
        let ordem = {'reclamacao': problema, imagem}
        if(problema === '')
        {
            setError(true)
            setErrorMessage('Descrição não pode estar em branco')
            return
        }
        setError(false)

        try
        {
            let request = await axios.post(
                `${props.api}api/ordem/`,
                ordem,
                { withCredentials: true,
                    headers: {'Content-Type': 'multipart/form-data'} },
            );
            window.location.href = '/'
        }
        catch(err)
        {
            console.log(err)
        }
        console.log(ordem)
    }

    
    return(
        <div className="container cadastro">
            {!logged?
                <Navigate to="/login" />
                : null}
            <h2>Ordens de Serviço</h2>

            <Form>
                <Row>
                    {isError?
                    <Col sm={12}>
                        <Alert key='danger' variant='danger'>{errorMessage}</Alert>
                    </Col>
                : null}
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formProblema">
                            <Form.Label>Descrição do Problema</Form.Label>
                            <Form.Control as="textarea" rows={6} value={problema} onChange={onChangeProblema} placeholder="Nos descreva o problema" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formFile">
                            <Form.Label>Imagens do Problema</Form.Label>
                            <Form.Control type="file" onChange={onChangeFile}/>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="text-center">  
                    <Button className="formButton" variant="outline-primary" onClick={enviarOrdem} >Enviar Ordem</Button>{' '}
                </div>

            </Form>
        </div>
    );
}

export default Ordem