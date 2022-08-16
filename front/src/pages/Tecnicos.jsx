import React, { useState } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
const axios = require("axios");


export const cpfMask = (value) => {
    return value
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    };
    
export const cepMask = (value) => {
return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{5})(\d)/, "$1-$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(-\d{3})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

function Tecnico(props)
{
    document.title = 'Cadastro Técnico';
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirma, setConfirma] = useState("");
    const [nascimento, setNascimento] = useState("")
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [complemento, setComplemento] = useState("");
    const [numeroEnd, setNumeroEnd] = useState("");
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("")
    const [sobre, setSobre] = useState("")
    const [curriculo, setCurriculo] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setError] = useState(false)

    const ESTADOS = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES',
    'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ',
    'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

    const thirteenYears = () =>
    {
        let thirteenYearsAgo = new Date();
        thirteenYearsAgo = thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear()-12);
        thirteenYearsAgo = new Date(thirteenYearsAgo)
        return `${String(thirteenYearsAgo.getFullYear()).padStart(2, '0')}-${String(thirteenYearsAgo.getMonth()).padStart(2, '0')}-${String(thirteenYearsAgo.getDate()).padStart(2, '0')}`
    }

    async function loginBack(email, senha)
    {
        let user = {email, 'password': senha}

        try
        {
            await axios.post(
                `${props.api}api/login/`,
                user,
                { withCredentials: true }
            )
            window.location.href = '/';
        }
        catch (err)
        {
            if(err.response.status === 403)
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

    async function addTecnico()
    {
        let cliente = {nome, cpf, email, nascimento, cep, rua, complemento, numeroEnd, bairro, cidade, uf, senha, confirma, sobre, curriculo}
        console.log(cliente)

        if(nome === '')
        {
            setError(true)
            setErrorMessage('Nome não pode estar em branco')
            return
        }
        else if(cpf === '')
        {
            setError(true)
            setErrorMessage('CPF não pode estar em branco')
            return
        }
        else if(email === '')
        {
            setError(true)
            setErrorMessage('Email não pode estar em branco')
            return
        }
        else if(senha !== confirma || senha === '')
        {
            setError(true)
            setErrorMessage('Senhas não correspondem')
            return
        }
        else if(curriculo === '')
        {
            setError(true)
            setErrorMessage('Necessário enviar curriculo')
            return
        }

        setError(false)
        try{
            let request = await axios.post(
                `${props.api}api/register/`,
                {
                    'name': nome,
                    email,
                    'password': senha,
                    cpf,
                    'birthdate': nascimento,
                    cep,
                    'street': rua,
                    'numero': numeroEnd,
                    'complemento': 'Fundo',
                    bairro,
                    cidade,
                    uf,
                    sobre,
                    'curriculum': curriculo,
                    'tecnico': true
                }, 
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            );

            if(request.status === 201)
                loginBack(email, senha)
            else
            {
                setError(true)
                setErrorMessage(request.data.message)
            }
        }
        catch(err)
        {
            setError(true)
            setErrorMessage(`Error: ${err.response.status} - ${err.response.statusText}`)
            console.log(err)
        }
        
    }

    async function onChangeCep(e) {
        setCep(cepMask(e.target.value));
        if (String(e.target.value).length === 9) {
        let cepPonto = e.target.value;
        let cepSemPonto = cepPonto.replace("-", "");
        let retorno = await axios.get(
            `https://viacep.com.br/ws/${cepSemPonto}/json`
        );
        setRua(retorno.data.logradouro);
        setCidade(retorno.data.localidade);
        setUf(retorno.data.uf);
        setBairro(retorno.data.bairro)
        }
    }

    const onChangeRua = (event) => {
        setRua(event.target.value);
    };

    const onChangeComplemento = (event) => {
        setComplemento(event.target.value);
    };

    const onChangeCidade = (event) => {
        setCidade(event.target.value);
    };

    const onChangeUF = (event) =>
    {
        setUf(event.target.value);
    };

    const onChangeBairro = (event) =>
    {
        setBairro(event.target.value);
    }

    const onChangeNome = (event) =>
    {
        setNome(event.target.value);
    }

    const onChangeCpf = (event) =>
    {
        setCpf(cpfMask(event.target.value));
    }

    const onChangeSenha = (event) =>
    {
        setSenha(event.target.value);
    }

    const onChangeConfirma = (event) =>
    {
        setConfirma(event.target.value);
    }

    const onChangeEmail = (event) =>
    {
        setEmail(event.target.value);
    }

    const onChangeNascimento = (event) =>
    {
        setNascimento(event.target.value);
    }

    const onChangeNumero = (event) =>
    {
        setNumeroEnd(event.target.value);
    }

    const onChangeSobre = (event) =>
    {
        setSobre(event.target.value);
    }

    const onChangeFile = (event) =>
    {
        setCurriculo(event.target.files[0])
    }

    return(
        <div className="container cadastro">
            <h2>Cadastro de Técnicos</h2>
            <Form>
            <Row>
                {isError?
                <Col sm={12}>
                    <Alert key='danger' variant='danger'>{errorMessage}</Alert>
                </Col>
            : null}
            </Row>
            <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome" value={nome} onChange={onChangeNome}/>
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group className="mb-3" controlId="formCPF">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="text" placeholder="Digite o CPF" maxLength={14} value={cpf} onChange={onChangeCpf}/>
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group className="mb-3" controlId="formNasc">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control type="date" min="1900-01-01" max={thirteenYears()} value={nascimento} onChange={onChangeNascimento}/>
                        </Form.Group>
                    </Col>

                </Row> 

                <Row>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Digite o email" value={email} onChange={onChangeEmail} />
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite a senha" onChange={onChangeSenha} />
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group className="mb-3" controlId="formConfirm">
                            <Form.Label>Confirme a senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite a senha novamente" onChange={onChangeConfirma}/>
                        </Form.Group>
                    </Col>
                    

                </Row>

                <Row>

                    <Col sm={3}>
                        <Form.Group className="mb-3" controlId="formCEP">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control type="text" placeholder="Digite o CEP" value={cep} onChange={onChangeCep} />
                        </Form.Group>
                    </Col>
                    
                    <Col sm={4}>
                        <Form.Group className="mb-3" controlId="formRua">
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control type="text" placeholder="Rua" value={rua} onChange={onChangeRua} />
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Form.Group className="mb-3" controlId="formNumber">
                            <Form.Label>Número</Form.Label>
                            <Form.Control type="text" placeholder="Digite o número" value={numeroEnd} onChange={onChangeNumero}/>
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group className="mb-3" controlId="formComplemento">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control type="text" placeholder="Complemento" value={complemento} onChange={onChangeComplemento} />
                        </Form.Group>
                    </Col>

                </Row>


                <Row>

                    <Col sm={5}>
                        <Form.Group className="mb-3" controlId="formBairro">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control type="text" placeholder="Bairro" value={bairro} onChange={onChangeBairro} />
                        </Form.Group>
                    </Col>

                    <Col sm={5}>
                        <Form.Group className="mb-3" controlId="formCidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control type="text" placeholder="Cidade" value={cidade} onChange={onChangeCidade} />
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Form.Group className="mb-3" controlId="formUF">
                            <Form.Label>UF</Form.Label>
                            <Form.Select value={uf} onChange={onChangeUF}>
                                <option>Selecione o Estado</option>
                                {ESTADOS.map((element) => <option key={element}>{element}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formSobre">
                            <Form.Label>Sobre você</Form.Label>
                            <Form.Control as="textarea" rows={6} value={sobre} onChange={onChangeSobre} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col sm={3}>
                        <Form.Group className="mb-3" controlId="formFile">
                            <Form.Label>Currículo</Form.Label>
                            <Form.Control type="file" onChange={onChangeFile}/>
                        </Form.Group>
                    </Col>
                </Row>
                
                <div className="text-center">  
                    <Button className="formButton" variant="outline-primary" onClick={addTecnico} >Adicionar Técnico</Button>{' '}
                </div>
                
                <p><Link to='/clientes'> ou criar como Cliente</Link></p>

            </Form>
        </div>
    );
}

export default Tecnico;