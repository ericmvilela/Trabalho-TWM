import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from '../Images/Phone.png';
const axios = require("axios");

function Navbar(props)
{

    const [userState, setUserState] = useState(false)
    const [nameUser, setNameUser] = useState("")
    const [isTecnico, setTecnico] = useState("")

    async function getInfo()
    {
        axios.get(
            `${props.api}api/me/`,
            { withCredentials: true }
        )
        .then((response) => {
            console.log(response)
            setUserState(true);
            setNome(response.data.name);
            setTecnico(response.data.tecnico);
        },[])
        .catch((err) =>
        {
            setUserState(false)
        })
    }

    async function logout()
    {
        try
        {
            let request = await axios.post(
                `${props.api}api/logout/`,
                {},
                { withCredentials: true }
            )
            window.location.href = '/';
        }
        catch (err)
        {
           console.log(err)
        }

    }

    useEffect(() => {
        getInfo();
      }, [])

    function setNome(nome)
    {
        let nomeArray = nome.split(" ")
        if(nomeArray.length > 1)
            setNameUser(`${nomeArray[0]} ${nomeArray[nomeArray.length - 1]}`);
        else
            setNameUser(nomeArray[0]);
    }

    return (
        <div className="navBar">
            <div className="links">
                <li>
                    <Link to='/'><img src={logo} alt="Logo" className="logo"/></Link>
                </li>
                
                {userState?
                isTecnico?
                <>
                    <li>
                        <Link to="/ordens-tecnico">Ordem de Serviço</Link>
                    </li>
                </>:
                
                <>
                    <li>
                        <Link to="/produtos">Produtos</Link>
                    </li>
                    <li>
                        <Link to="/ordens-cliente">Suporte</Link>
                    </li>
                    <li>
                        <Link to="/minhas-ordens">Minhas Ordens</Link>
                    </li>
                </>
                :null
                }
                
            </div>
            
            
            <div className='login'>
                {userState ? (
                    <div className="logged"><p className="userInfo">Olá {nameUser} &ensp;</p> <Button variant="outline-danger" onClick={logout}>Sair</Button></div>          
                ) : (
                    <Link to="/login"><Button variant="success">Login</Button>{' '}</Link>
                )}
                 
            </div>

        </div>
      );
}

export default Navbar;