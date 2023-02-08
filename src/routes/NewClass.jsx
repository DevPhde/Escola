import { useEffect, useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import { AxiosApi } from "../services/RequisitionAPI"
import "../styles/classRoomRegister.css"
function NewClass() {

    const [values, setValues] = useState({
        classRoom: "",
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
    const [teachers, setTeachers] = useState([]);

    const filteredProfessors = teachers.filter(teacher => !teacher.classRoom);

    const [selectedTeacher, setSelectedTeacher] = useState('');
    const handleChange = (event) => {
        const selectedOption = teachers.find(
            (teacher) => teacher.nome === event.target.value
        );
        setSelectedTeacher(selectedOption);
        setSteps(prevStats => ({ ...prevStats, two: false, three: true }))
    };
    // console.log(teachers)
    useEffect(() => {
        async function axiosData() {
            const connection = await AxiosApi.Get('/professores')
            setTeachers(connection.data)
        }
        console.log(teachers)
        axiosData()
    }, [selectedTeacher])

    const [invalidInput, setInvalidInput] = useState({
        classRoom: false,
        year: false,
        errorClassRoom: false,
        errorYear: false,
        inputsPassed: 0
    })
    console.log(invalidInput)
    const handleClassRoomBlur = () => {
        if (values.classRoom.length == 4) {
            setInvalidInput(prevState => ({ ...prevState, errorClassRoom: false, classRoom: true }))
        } else {
            setInvalidInput(prevState => ({ ...prevState, errorClassRoom: true }))

        }
    }
    const handleYearBlur = () => {
        if ((values.year.length < 3) && (values.year.length > 0)) {
            setInvalidInput(prevState => ({ ...prevState, errorYear: false, year: true }))
        } else {
            setInvalidInput(prevState => ({ ...prevState, errorYear: true }))

        }
    }
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
                            <section>
                                <Row className="mb-3  d-flex justify-content-between">
                                    <Form.Group as={Col} md="3" controlId="classRoomCode">
                                        <Form.Label className="text-white">Turma</Form.Label>
                                        <Form.Control
                                            value={values.classRoom}
                                            type="number"
                                            placeholder="Ex.: 1001"
                                            onChange={(event) => setValues((prevState) => ({ ...prevState, classRoom: event.target.value }))}
                                            onBlur={handleClassRoomBlur}
                                            isInvalid={invalidInput.errorClassRoom}
                                        />
                                        <Form.Control.Feedback type="invalid" className='text-danger'>
                                            Preencha com a numeração da turma, a numeração deve conter 4 dígitos.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="3" controlId="classRoomCode">
                                        <Form.Label className="text-white">Série</Form.Label>
                                        <Form.Control
                                            value={values.year}
                                            type="number"
                                            placeholder="Ex.: 1"
                                            onChange={(event) => setValues((prevState) => ({ ...prevState, year: event.target.value }))}
                                            onBlur={handleYearBlur}
                                            isInvalid={invalidInput.errorYear}
                                        />
                                        <Form.Control.Feedback type="invalid" className='text-danger'>
                                            Preencha com a série, apenas números.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </section>


                            <button onClick={(e) => {
                                e.preventDefault()
                                if ((invalidInput.classRoom) && (invalidInput.year)) {
                                    setSteps(prevState => ({ ...prevState, one: false, two: true }))
                                } else {
                                    handleClassRoomBlur()
                                    handleYearBlur()
                                }
                            }} className=' mt-5 btn-light btn'>Prosseguir</button>
                        </div>
                    ) : (
                        <div className="teacher__selected border rounded-pill d-flex justify-content-center">
                            <p className="text-white mt-1">Turma: {values.classRoom}</p>
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