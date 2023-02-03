import { StudentUseCases } from "../useCases/StudentUseCases"
import { useState } from "react"
import "../styles/registry.css"
import { ErrorInput } from "../components/ErrorInput"

//PEDENCIAS =>

// FINALIZAR VALIDAÇÃO DE INPUTS
// HOOK DE REGEX NO CPF
// HOOK DE REGEX DATA DE NASCIMENTO

function NewStudent() {

    // HOOKS
    const [registration, setRegistration] = useState('')
    const [fullNameInput, setFullNameInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')
    const [birthdayInput, setBirthdayInput] = useState('')

    // ERROR HOOKS
    // const [ErrorFullName, setErrorFullName] = useState('')
    // const [ErrorBirthday, setErrorBirthday] = useState('')
    // const [ErrorCPF, setErrorCPF] = useState('')
    // const [ErrorRegistration, setErrorRegistration] = useState('')





    const [createStudent, setCreateStudent] = useState('')
    async function createNewStudent(e) {
        e.preventDefault()
        // const map = [fullNameInput, cpfInput, birthdayInput, registration]  //
        // for (let index = 0; index < map.length; index++) {
        //    if (map[index] == "") {
        //    }   
        // }
        const student = await StudentUseCases.CreateStudent(fullNameInput, cpfInput, birthdayInput, registration)
        setCreateStudent(student)

    }
    return (
        <main>
            <h3 className='text-center mb-5'>Cadastrar novo aluno</h3>
            <form>
                <div className="container p-3 mt-5 border rounded-5">
                    <div className="row align-items-center py-5 ms-5">
                        <section className="col-lg-5 px-2">
                            {/* <ErrorInput message={ErrorFullName}/> */}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control border-secondary" value={fullNameInput} onChange={event => setFullNameInput(event.target.value)} placeholder="Nome Completo" />
                                <label htmlFor='floatingFullName'>Nome Completo</label>
                            </div>
                            {/* <ErrorInput message={ErrorBirthday} /> */}
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control border-secondary" value={cpfInput} onChange={event => setCpfInput(event.target.value)} placeholder="CPF" />
                                <label htmlFor='floatingCPF'>CPF</label>
                            </div>
                        </section>
                        <section className="mx-auto col-lg-5 px-2">
                            {/* <ErrorInput message={ErrorCPF} /> */}
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control border-secondary" value={birthdayInput} onChange={event => setBirthdayInput(event.target.value)} placeholder="Data de Nascimento" />
                                <label htmlFor='floatingBirthday'>Data de Nascimento</label>
                            </div>
                            {/* <ErrorInput message={ErrorRegistration}/> */}
                            <div className="input-group mb-3">
                                <input type="text" readOnly className="form-control form-control-lg" placeholder="Matrícula" value={registration} />
                                <button className="btn btn-danger" type="button" onClick={async (e) => {
                                    e.preventDefault()
                                    setRegistration(await StudentUseCases.StudentRegistration())
                                }}>Button</button>
                            </div>
                        </section>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                        <button type="submit" className="btn btn-light" onClick={createNewStudent}>Cadastrar</button>
                    </div>
                    <p className="text-center mt-5">{createStudent}</p>
                </div>
            </form>
        </main >
    )
}

export default NewStudent