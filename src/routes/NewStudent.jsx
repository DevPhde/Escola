import { StudentUseCases } from "../useCases/StudentUseCases"
import { useEffect, useState } from "react"
import "../styles/registry.css"
import Input from "../components/Input"

function NewStudent() {

    const colorError = {
        true: "invalid",
        false: "border-secondary"
    }
    const [error, setError] = useState({
        name: "",
        cpf: "",
        birthday: "",
        registration: ""
    })
    const [name, setName] = useState({
        value: "",
        color: colorError.false
    });

    const [cpf, setCpf] = useState({
        value: "",
        color: colorError.false
    });

    const [birthday, setBirthday] = useState({
        value: "",
        color: colorError.false
    });

    const [registration, setRegistration] = useState({
        value: "",
        color: colorError.false
    });

    const handleRegistration = async (e) => {
        e.preventDefault()
        const registration = await StudentUseCases.StudentRegistration()
        setRegistration((prevState) => ({ ...prevState, value: registration }))
    }

    async function createNewStudent(e) {
        e.preventDefault()
        // const hooks = [name.fullName]
        const hooks = [
            name,
            cpf,
            birthday,
            registration
        ]
        console.log(hooks)

        const objects = {
            name: [setName, setError],
            birthday: [setBirthday, setError],
            cpf: [setCpf, setError],
            registration: [setRegistration, setError]
        }

        for (let index = 0; index < hooks.length; index++) {
            console.log(hooks[index].value)
            if (hooks[index].value == "") {
                console.log('error')
                objects.hooks[index][0](prevState => { console.log(prevState)
                    return { ...prevState, color: "invalid"}
                });
                objects.name[1](prevState => { console.log(prevState)
                    return { ...prevState, name: "Campo Obrigatório"}
                });

                // setName({ error: true})
                // console.log(values.error)
            }
        }
    }

    // const student = await StudentUseCases.CreateStudent(fullNameInput, cpfInput, birthdayInput, registration)
    // setCreateStudent(student)
    // return


    return (
        <main>
            <h3 className='text-center text-white mb-5'>Cadastrar Aluno</h3>
            <form>
                <div className="container mt-5 border rounded-5 bg-light">
                    <div className="mb-2 py-5 d-flex justify-content-center">
                        <section className="col-lg-5 px-2">
                            <div>
                                {error.name && <p className="text-danger">{error.name}</p>}
                                <Input placeholder="Nome Completo" className={`${name.color} form-control`} htmlFor="FullName" label="Nome Completo" value={name.value} onChange={(event) => setName((prevState) => ({ ...prevState, value: event.target.value }))} />
                            </div>

                            <div>
                                <Input mask="999.999.999-99" placeholder="CPF" className={`${cpf.color} form-control`} htmlFor="CPF" label="CPF" value={cpf.value} onChange={(event) => setCpf((prevState) => ({ ...prevState, value: event.target.value }))} />

                            </div>

                            <div>
                                <Input mask="99/99/9999" placeholder="Data de Nascimento" className={`${birthday.color} form-control`} htmlFor="birthday" label="Data de Nascimento" value={birthday.value} onChange={(event) => setBirthday((prevState) => ({ ...prevState, value: event.target.value }))} />
                            </div>

                            <div className="input-group mb-3">
                                <input type="text" readOnly className={`form-control form-control-lg ${registration.color}`} placeholder="Matrícula" value={registration.value} />
                                <button className="btn btn-danger" type="button" onClick={handleRegistration}>Button</button>
                            </div>
                        </section>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                        <button type="submit" className="btn btn-dark" onClick={createNewStudent}>Cadastrar</button>
                    </div>
                    {/* <p className="text-center mt-5 text-success">{createStudent}</p> */}
                </div>
            </form>
        </main >
    )
}

export default NewStudent