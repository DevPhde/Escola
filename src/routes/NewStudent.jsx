import { registrationGenerator } from "../services/RegistrationGen"
import { useState } from "react"
import axios from "axios"
function NewStudent() {
    const [registration, setRegistration] = useState('')

    async function genRegistration() {
        const data = await registrationGenerator()
        axios.get(`http://localhost:3000/alunos?matricula=${data}`).then((response) => {
            if (response.data.length != 0) {
                genRegistration()
            }           
        })
        return data
    }

    function createNewStudent() {
        //criar funcao de fazer post com novo aluno
    }
    return (
        <main>
            <h3 className='text-white text-center mb-5'>Cadastrar novo aluno</h3>
            <form>
                <section className='mx-auto col-lg-5 px-5'>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control border-secondary" id="floatingFullName" placeholder="Nome Completo" />
                        <label htmlFor='floatingFullName'>Nome Completo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control border-secondary" id="floatingBirthday" placeholder="Data de Nascimento" />
                        <label htmlFor='floatingBirthday'>Data de Nascimento</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" readOnly className="form-control border-secondary" id="floatingPassword" placeholder="Matrícula" value={registration} />
                        <label htmlFor='Registry'>Matrícula</label>
                    </div>

                    <div>
                        <button className='align-middle btn-danger btn' onClick={async (e) => {
                            e.preventDefault()
                            setRegistration(await genRegistration())
                        }}>Gerar Nova Matrícula</button>
                    </div>
                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                </section>
            </form>
        </main>
    )
}

export default NewStudent