import { useState } from "react"
import { TeacherUseCases } from "../useCases/TeacherUseCases"
import "../styles/registry.css"
function NewTeacher() {
    // HOOKS
    const [fullNameInput, setFullNameInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')
    const [matterInput, setMatterInput] = useState('')

    const [createTeacher, setCreateTeacher] = useState('')



    async function newTeacher(e) {
        e.preventDefault()
        const create = await TeacherUseCases.CreateTeacher(fullNameInput, cpfInput, matterInput)
        setCreateTeacher(create)

    }

    return (
        <main>
            <h3 className='text-center mb-5'>Cadastrar novo Professor</h3>
            <form>
                <div className="container p-5 mt-5 border rounded-5">
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
                        {/* <ErrorInput message={ErrorFullName}/> */}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control border-secondary" value={matterInput} onChange={event => setMatterInput(event.target.value)} placeholder="Matéria" />
                            <label htmlFor='floatingMatter'>Matéria</label>
                        </div>
                        <div className="d-flex justify-content-center mb-5">
                            <button type="submit" className="btn btn-light" onClick={newTeacher}>Cadastrar</button>
                        </div>
                        <p className="text-center mt-5">{createTeacher}</p>
                    </section>
                </div>
            </form>
        </main >
    )
}

export default NewTeacher