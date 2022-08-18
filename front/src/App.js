import Clientes from './pages/Clientes';
import Navbar from './Components/Navbar';
import Produtos from './pages/Produtos'
import Tecnico from './pages/Tecnicos';
import OrdemCliente from './pages/OrdemCliente';
import OrdemTecnico from './pages/OrdemTecnico';
import OrdemMinha from './pages/OrdemMinha';
import Login from './pages/Login';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

    const local = 'http://localhost:8000/'
    const web = 'https://drf-twm.herokuapp.com/'

    return (
        <div>
            <Router>
                <Navbar api={local}/>
                    <Routes>
                        <Route exact path='/' element={<Home />}/>
                        <Route exact path="/clientes" element={<Clientes api={local} />}/>
                        <Route exact path="/tecnicos" element={<Tecnico api={local} />}/>
                        <Route exact path="/produtos" element={<Produtos api={local} />}/>
                        <Route exact path="/ordens-cliente" element={<OrdemCliente api={local} />}/>
                        <Route exact path="/ordens-tecnico" element={<OrdemTecnico api={local} />}/>
                        <Route exact path="/minhas-ordens" element={<OrdemMinha api={local} />}/>
                        <Route exact path="/login" element={<Login api={local} />}/>
                    </Routes>
            </Router>

        </div>
    );
}

export default App;
