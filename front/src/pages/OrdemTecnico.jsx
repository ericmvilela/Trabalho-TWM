import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {Navigate} from 'react-router-dom';
import test from '../Images/carro.png'
const axios = require("axios");

function Ordem(props)
{
    const [logged, setLogin] = useState(true);
    const [data, setData] = useState('')

    function checkLogin()
    {
        axios.get(
            `${props.api}api/me/`,
            { withCredentials: true }
        )
        .then((response) => {
            setLogin(response.data.tecnico)
        },[])
        .catch((err) =>
        {
            setLogin(false)
        })
    }

    useEffect(() => {
        checkLogin();
        getOrdens();
      }, [])

    
    function getOrdens()
    {
        axios.get(
            `${props.api}api/ordem/`,
            { withCredentials: true }
        )
        .then((response) => {
            setData(response.data)
        },[])
        .catch((err) =>
        {
            console.log(err)
        })
    }

    async function updateOrdem(event)
    {
        let id_ordem = event.target.getAttribute('id_ordem')
        let estado = event.target.getAttribute('update_status')

        try
        {
            let request = await axios.patch(
                `${props.api}api/ordem/`,
                {
                    'id': id_ordem,
                    estado
                }
                ,
                { withCredentials: true }
            )

            window.location.reload(false);
        }
        catch (err)
        {
           console.log(err)
        }
    }

    return(
    <div className="container cadastro">
        {!logged?
            <Navigate to="/login" />
            : null}
        <h2>Ordens Pendentes</h2>
        <div>
        {Object.values(data).map((ordem) =>{
            if(ordem.estado === 'A' || ordem.estado === 'E')
                return(
                    <Row className={`ordens estado-${ordem.estado}`}>
                        <Row className="rowOrdens">
                            <Col>
                                <p>Id: {ordem.id}</p>
                            </Col>
                            <Col>
                                <p>{ordem.name}</p>
                            </Col>
                            <Col>
                                <p>{ordem.estadoCompleto}</p>
                            </Col>
                        </Row>
                        <Row className="rowOrdens">
                            <Col sm={7}>
                                <p>{ordem.reclamacao}</p>
                            </Col>
                            <Col sm={5} className='imgContainer'>
                                <img src={`${props.api}${ordem.imagem.substring(1)}`} alt="" className="imgOrdem" />
                            </Col>
                        </Row>
                        <Row className="rowOrdens">
                            <Col>
                                <p>{`Endereço: ${ordem.rua}, ${ordem.numero} - ${ordem.complemento} - ${ordem.cidade} - ${ordem.uf}`}</p>
                            </Col>
                        </Row>
                        <Row className="buttonOrdens">
                            {ordem.estado === 'E'?
                            <Button variant="danger" className="botao" id_ordem={ordem.id} update_status='F' onClick={updateOrdem}>Finalizar</Button>
                            :
                            <><Button variant="danger" className="botao" id_ordem={ordem.id} update_status='C' onClick={updateOrdem}>Cancelar</Button> 
                                <Button variant="success" className="botao" id_ordem={ordem.id} update_status='E' onClick={updateOrdem}>Aceitar</Button></>
                            }
                            
                                
                        </Row>
                    </Row>
                )
            })}
        </div>
    </div>
    )
}

export default Ordem;
