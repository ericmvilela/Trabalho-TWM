import React from "react";
import { Button, Carousel } from "react-bootstrap/";
import { Link } from "react-router-dom";
import viagem from '../Images/viagem.png';
import celular from '../Images/celular.png'
import carro from '../Images/carro.png'

function Home(props)
{

    document.title = 'Teleufu';
    return(
        <div className="container">
            <h2>TELEUFU</h2>
            <Carousel variant="dark">
                <Carousel.Item>
                    <Link to='/produtos'><img 
                        className="d-block w-100"
                        src={celular}
                        alt="First slide"
                    /></Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to='/produtos'><img
                        className="d-block w-100"
                        src={viagem}
                        alt="Second slide"
                    /></Link>
                </Carousel.Item>
                <Carousel.Item>
                <Link to='/produtos'><img
                        className="d-block w-100"
                        src={carro}
                        alt="Second slide"
                    /></Link>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Home