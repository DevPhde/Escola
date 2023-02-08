import { useEffect, useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import { AxiosApi } from "../services/RequisitionAPI"
import "../styles/classRoomRegister.css"
function NewClass() {

    const [values, setValues] = useState({
        turma: "",
        professor: "",
        students: "",
        year: ""
    })
    const [steps, setSteps] = useState({
        one: true,
        two: false,
        three: false,
        four: false
    })
    const [data, setData] = useState(false)
    const [teachers, setTeachers] = useState([]);

    const filteredProfessors = teachers.filter(teacher => !teacher.turma);

    const [selectedTeacher, setSelectedTeacher] = useState('');
    const handleChange = (event) => {
        const selectedOption = teachers.find(
            (teacher) => teacher.nome === event.target.value
        );
        setSelectedTeacher(selectedOption);
        setSteps(prevStats => ({...prevStats,  two: false, three: true }))
    };
    // console.log(teachers)
    useEffect(() => {
        async function axiosData() {
            const connection = await AxiosApi.Get('/professores')
            setTeachers(connection.data)
        }
        console.log(teachers)
        // setData(true)
        axiosData()
    }, [selectedTeacher])

    const [invalidInput, setInvalidInput] = useState({
        pass: false,
        error: false
    })
console.log(steps)
    return (
        <main>
            {teachers ? (
                <div>
                    <div className="mb-5">
                        <h5 className="text-white text-center">Criar Turma</h5>
                    </div>

                    {steps.one &&
                        steps.one ? (
                        <div className="m-5 text-center">

                            <Form.Group className="mx-5" controlId="classRoomCode">
                                <Form.Label className="text-white">Turma</Form.Label>
                                <Form.Control
                                    value={values.turma}
                                    type="number"
                                    placeholder="Ex.: 1001"
                                    onChange={(event) => setValues((prevState) => ({ ...prevState, turma: event.target.value }))}
                                    onBlur={(() => {
                                        if (values.turma.length == 4) {
                                            setInvalidInput(() => ({error: false, pass: true}))
                                        } else {
                                            setInvalidInput(prevState => ({...prevState, error: true}))

                                        }
                                    })}
                                    isInvalid={invalidInput.error}
                                />
                                <Form.Control.Feedback type="invalid" className='text-danger'>
                                    Preencha com a numeração da turma, a numeração deve conter 4 dígitos.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <button onClick={(e) => {
                                e.preventDefault()
                                if (invalidInput.pass) {
                                    setSteps(prevState => ({ ...prevState, one: false, two: true }))
                                } else {
                                    setInvalidInput(prevState => ({...prevState, error: true}))
                                }
                            }} className=' mt-5 btn-light btn'>Prosseguir</button>
                        </div>
                    ) : (
                        <div className="teacher__selected border rounded-pill d-flex justify-content-center">
                            <p className="text-white mt-1">Turma: {values.turma}</p>
                        </div>
                    )}


                    {steps.two &&
                        <div>
                            <section className="col-lg-5 row text-center">
                                <Form.Group controlId="ControlSelect1">
                                    <Form.Label className="text-white">Professores</Form.Label>
                                    <Form.Control as="select" value={selectedTeacher} onChange={handleChange}>
                                        <option value="" disabled>Selecionar professor</option>
                                        {filteredProfessors.map((teacher) => (
                                            <option key={teacher.id}>{teacher.nome}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </section>
                        </div>}

                    {steps.three &&
                        <div>
                            <div className="teacher__selected border rounded-pill d-flex justify-content-center">
                                <p className="text-white mt-1">Professor(a): {selectedTeacher.nome}</p>
                            </div>
                        </div>}

                    {steps.four &&
                        (
                            <div className="text-white mt-5">
                                <section className="col-lg-5 row text-center">
                                    <Form.Group controlId="ControlSelect1">
                                        <Form.Label className="text-white">Professores</Form.Label>
                                        <Form.Control as="select" value={selectedTeacher} onChange={handleChange}>
                                            <option value="" disabled>Selecionar professor</option>
                                            {teachers.map((teacher) => (
                                                <option key={teacher.id}>{teacher.nome}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </section>
                            </div>
                        )}
                </div>
            ) : (
                <div>
                    <h1>Loading</h1>
                </div>
            )}




        </main>
    )
}

export default NewClass