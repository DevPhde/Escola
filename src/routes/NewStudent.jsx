import { StudentUseCases } from "../useCases/StudentUseCases"
import { useEffect, useState } from "react"
import "../styles/registry.css"
import Input from "../components/Input"
//PEDENCIAS =>

// FINALIZAR VALIDAÇÃO DE INPUTS
// HOOK DE REGEX NO CPF
// HOOK DE REGEX DATA DE NASCIMENTO

function NewStudent() {
    const [values, setValues] = useState({
        fullName: "",
        cpf: "",
        birthday: "",
        registration: "",
        error: false,
        color: "border-secondary"
    })


    // const [color, setColor] = useState("form-control border-secondary");
    // const handleClick = () => {

    //         setValues({ color: "border-secondary" });
    // };

    async function createNewStudent(e) {
        e.preventDefault()
        const hooks = [values.fullName, values.cpf, values.birthday, values.registration]
        console.log(hooks)


        for (let index = 0; index < hooks.length; index++) {
            const element = hooks[index];
            console.log(element)
            if (element === "") {
                console.log('error')
                setValues({ color: 'invalid' });
                setValues({error: true})
                console.log(values.error)
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
                <div className="container p-3 mt-5 border rounded-5 bg-light">
                    <div className="row align-items-center py-5 ms-5">
                        <section className="col-lg-5 px-2">
                            <div>
                                {/* {error && <p>{error}</p>} */}
                                <Input placeholder="Nome Completo" className={`${values.color} form-control`} htmlFor="FullName" label="Nome Completo" value={values.fullName} onChange={event => setValues({ fullName: event.target.value })} />
                            </div>

                            <div>
                                {/* <Input mask="999.999.999-99" placeholder="CPF" className="form-control border-secondary" htmlFor="CPF" label="CPF" value={cpfInput} onChange={event => setCpfInput(event.target.value)} /> */}

                            </div>

                            <div>
                                {/* <Input mask="99/99/9999" placeholder="Data de Nascimento" className="form-control border-secondary" htmlFor="birthday" label="Data de Nascimento" value={birthdayInput} onChange={event => setBirthdayInput(event.target.value)} /> */}
                            </div>

                            {/* <div className="input-group mb-3">
                                <input type="text" readOnly className="form-control form-control-lg border-secondary" placeholder="Matrícula" value={registration} />
                                <button className="btn btn-danger" type="button" onClick={async (e) => {
                                    e.preventDefault()
                                    setRegistration(await StudentUseCases.StudentRegistration())
                                }}>Button</button>
                            </div> */}
                        </section>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                        <button type="submit" className="btn btn-light" onClick={createNewStudent}>Cadastrar</button>
                    </div>
                    {/* <p className="text-center mt-5 text-success">{createStudent}</p> */}
                </div>
            </form>
        </main >
    )
}

export default NewStudent