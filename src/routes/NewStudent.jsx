import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { StudentUseCases } from '../useCases/StudentUseCases';
import { Link } from 'react-router-dom';

function newStudent() {
  //CPF
  const cpfRef = useRef(null);

  const handleChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");

    if (inputValue.length <= 11) {
      let formattedValue = "";

      for (let i = 0; i < inputValue.length; i++) {
        if (i === 3 || i === 6) {
          formattedValue += ".";
        }
        if (i === 9) {
          formattedValue += "-";
        }
        formattedValue += inputValue[i];
      }

      setValues((prevState) => ({ ...prevState, cpf: formattedValue }))
      cpfRef.current.value = formattedValue;
    }
  };

  //DATA DE NASCIMENTO

  const handleBirthday = (event) => {
    let value = event.target.value;

    if (value.length === 11) {
      return;
    }

    if (value.length === 2 || value.length === 5) {
      value += '/';
    }

    setValues((prevState) => ({ ...prevState, birthday: value }))
  };

  const [renderResponse, setRenderResponse] = useState({
    response: "",
    status: true
  })
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false)
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (values.registration == "") {
      setError(true)
    }
    if (form.checkValidity() === false || valid < 4) {
      event.preventDefault();
      event.stopPropagation();

    } else {
      event.preventDefault();
      const response = await StudentUseCases.CreateStudent(values.name, values.cpf, values.birthday, values.registration)
      setRenderResponse({ response: response, status: false })

    }
    setValidated(true);
  };

  const [generate, setGenerete] = useState(false)

  const [valid, setValid] = useState(0)

  const [values, setValues] = useState({
    name: '',
    cpf: '',
    birthday: '',
    registration: ''
  })
  const [validate, setValidate] = useState({
    name: false,
    cpf: false,
    birthday: false,
    registration: false
  })

  const handleRegistration = async (e) => {
    e.preventDefault()
    const registration = await StudentUseCases.StudentRegistration()
    setValues((prevState) => ({ ...prevState, registration: registration }))
    setGenerete(true)
    setValid(valid + 1)
    setValidate((prevState) => ({ ...prevState, registration: false }))
  }

  return (
    <main>
      {renderResponse.status ? (
        <div className='text-white'>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="fullName">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  value={values.name}
                  type="text"
                  placeholder="Nome Completo"
                  onChange={(event) => setValues((prevState) => ({ ...prevState, name: event.target.value }))}
                  onBlur={(() => {
                    if (values.name.length < 8) {
                      setValidate((prevState) => ({ ...prevState, name: true }))
                    } else {
                      setValidate((prevState) => ({ ...prevState, name: false }))
                      setValid(valid + 1)
                    }
                  })}
                  required
                  isInvalid={validate.name}
                />
                <Form.Control.Feedback type="invalid" className='text-danger'>
                  Preencha com seu nome completo.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control type="text" placeholder="000.000.000-00" ref={cpfRef} value={values.cpf} onChange={handleChange} required
                  onBlur={(() => {
                    if (values.cpf.length == 14) {
                      setValidate((prevState) => ({ ...prevState, cpf: false }))
                      setValid(valid + 1)
                    } else {
                      setValidate((prevState) => ({ ...prevState, cpf: true }))
                    }})}
                  isInvalid={validate.cpf}
                />
                <Form.Control.Feedback type="invalid" className='text-danger'>
                  Preencha com um CPF válido.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="birthday">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control type="text" placeholder="00/00/0000" value={values.birthday} onChange={handleBirthday} required
                  onBlur={(() => {
                    if (values.birthday.length == 10) {
                      setValidate((prevState) => ({ ...prevState, birthday: false }))
                      setValid(valid + 1)
                    } else {
                      setValidate((prevState) => ({ ...prevState, birthday: true }))
                    }})}
                  isInvalid={validate.birthday} />
                <Form.Control.Feedback type="invalid" className='text-danger'>
                  Preencha com a data de nascimento.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              {!generate ? (
                <Form.Group>
                  <button
                    className='btn btn-light mt-3' onClick={handleRegistration}>Gerar Matrícula</button>
                  {error ? (<p className='text-danger'>É obrigatório gerar a matrícula no momento do cadastro.</p>) : ""}
                </Form.Group>
              ) : (
                <Form.Group as={Col} md="4" controlId="registration">
                  <Form.Label>Matrícula</Form.Label>
                  <Form.Control readOnly isValid={true} placeholder="Matrícula"
                    value={values.registration}></Form.Control>
                </Form.Group>
              )}
            </Row>
            <div className='text-center'>
              <Button className='text-center' type="submit">Cadastrar</Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className='mt-5'>
          <h2 className='text-center text-white'>{renderResponse.response}</h2>
          <div className='mt-4 mb-5 text-center'>
            <Link to="/"><button className='btn-light btn'>Voltar para Tela Inicial</button></Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default newStudent