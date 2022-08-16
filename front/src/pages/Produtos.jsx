import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import {Navigate} from 'react-router-dom';
const axios = require("axios");

function Produtos (props)
{
    const [logged, setLogin] = useState(true);
    const [produto, setProduto] = useState('Selecione o tipo de Seguro')
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

    const SERVICOS = ['SEGURO SAÚDE', 'SEGURO PARA CASA', 'SEGURO PARA AUTOMÓVEL', 'SEGURO DE VIDA', 'SEGURO PARA CELULAR', 'SEGURO VIAGEM']

    async function contratar()
    {
        if(produto.toLowerCase().includes('selecione'))
        {
            setError(true)
            setErrorMessage('Selecione algum produto')
            return
        }
        setError(false)

        try
        {
            let request = await axios.post(
                `${props.api}api/plano/`,
                {
                    'plano': produto
                }
                ,
                { withCredentials: true }
            )
            window.location.href = '/';
        }
        catch (err)
        {
           console.log(err)
        }
    }

    const onChangeProduto = (event) =>
    {   
        setProduto(event.target.value)
        if(event.target.value.toLowerCase().includes('selecione'))
        {
            setError(true)
            setErrorMessage('Selecione algum produto')
        }
        else
            setError(false)
    }

    return(
        <div className="container cadastro">
            {!logged?
                <Navigate to="/login" />
                : null}
            <h2>Escolha de produto</h2>
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
                        <Form.Group className="mb-3" controlId="formUF">
                            <Form.Label>Serviços</Form.Label>
                            <Form.Control as="select" value={produto} onChange={onChangeProduto}>
                                <option key='default'>Selecione o tipo de Seguro</option>
                                {SERVICOS.map((element) => <option key={element}>{element}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="text-center">  
                    <Button className="formButton" variant="outline-primary" onClick={contratar}>Contratar Serviço</Button>{' '}
                </div>
            </Form>
        </div>
    );
}

export default Produtos;