import { registrationGenerator } from "../services/RegistrationGen"
import { useState } from "react"
import "../styles/registry.css"
import TextInputForm from "../components/TextInputForm"
import { User } from "../entities/User"
import { AxiosApi } from "../services/Requisition"
function NewStudent() {

    // HOOKS
    const [fullNameInput, setFullNameInput] = useState('')
    const [motherNameInput, setMoterNameInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')
    const [birthdayInput, setBirthdayInput] = useState('')
    const [fatherNameInput, setFatherNameInput] = useState('')
    const [phoneInput, setPhoneInput] = useState('')
    const [registration, setRegistration] = useState('')
    const [cepInput, setCepInput] = useState('')
    const [streetInput, setStreetInput] = useState('')
    const [districtInput, setDistrictInput] = useState('')
    const [cityInput, setCityInput] = useState('')
    function createNewStudent() {
        console.log(fullNameInput)
    }
    // value={inputValue} onChange={event => setInputValue(event.target.value)}
    return (
        <main>
            <h3 className='text-white text-center mb-5'>Cadastrar novo aluno</h3>
            <form>
                <div className="container p-3 mt-5 border rounded-5">
                    <div className="row align-items-center py-4 ms-5">
                        <section className="col-lg-5 px-2">
                            <TextInputForm value={fullNameInput} onChange={event => setFullNameInput(event.target.value)} type="text" name="Nome Completo" />
                            <TextInputForm type="text" value={motherNameInput} name="Nome da Mãe" validate={false} />
                            <TextInputForm type="number" value={cpfInput} name="CPF" cpf={true} />
                            <TextInputForm type="number" value={cepInput} name="CEP" />
                            <TextInputForm readOnly={true} type="text" value={streetInput} name="Rua" />
                        </section>

                        <section className="mx-auto col-lg-5 px-2">
                            <TextInputForm type="number" value={birthdayInput} name="Data de Nascimento" birthday={true} />
                            <TextInputForm type="text" value={fatherNameInput} name="Nome do Pai" validate={false} />
                            <TextInputForm type="number" value={phoneInput} name="Telefone" phone={true} />
                            <TextInputForm readOnly={true} type="text" value={districtInput} name="Bairro" />
                            <TextInputForm  readOnly={true} type="text" value={cityInput} name="cidade" />
                        </section>
                    </div>
                    <section className="ms-3 input-group py-4 mb-5 input_with_button">
                        <input type="text" readOnly className="form-control" placeholder="Matrícula" value={registration} />
                        <button className="btn btn-danger" type="button" onClick={async (e) => {
                            e.preventDefault()
                            setRegistration(await CreateStundentUseCase.StudentRegistration())
                        }}>Button</button>
                    </section>
                    <div className="d-flex justify-content-center mb-5">
                        <button type="submit" className="btn btn-light" onClick={createNewStudent}>Cadastrar</button>
                    </div>
                </div>
            </form>
        </main >
    )
}

export default NewStudent