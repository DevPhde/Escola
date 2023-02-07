import { Link } from "react-router-dom"
import Input from "../components/Input"
import { useState, useEffect } from "react"
import "../styles/home.css"
import { AxiosApi } from "../services/RequisitionAPI"


function Home() {
    const [search, setSearch] = useState("")
    const [data, setData] = useState(undefined);
    const [requisitionData, setRequisitionData] = useState(undefined);
    const [searchError, setSearchError] = useState('')
    const [selectedOption, setSelectedOption] = useState('alunos')
    const [loadingScreen, setLoadingScreen] = useState("Carregando informações...")


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    };

    useEffect(() => {
        async function requisitionInfo() {
            try {
                const connection = await AxiosApi.Get(`/${selectedOption}`)
                // console.log(connection)
                setRequisitionData(connection.data)
            } catch (error) {
                setLoadingScreen("Erro Interno, Tente novamente mais tarde.")
            }

        }
        requisitionInfo()
    }, [selectedOption])



    useEffect(() => {
        if (search === "") {
            setRequisitionData(data)
            setSearchError("")
        }
    }, [search])

    const submitSearch = async (e) => {
        e.preventDefault()
        setData(requisitionData)
        let result
        if (selectedOption === "turmas") {
            result = requisitionData.filter(data => data.turma == search)
        } else {
            result = requisitionData.filter(data => data.nome == search).length == 0 ? requisitionData.filter(data => data.matricula == search) : requisitionData.filter(data => data.nome == search);
        }
        if (result.length == 0) {
            setRequisitionData(result)
            setSearchError("Nenhum cadastro encontrado.")
        } else {
            setRequisitionData(result)

        }


    }
    return (
        <main>
            <div>
                <div className="d-flex justify-content-center search__input">
                    <form onSubmit={submitSearch}>
                        <Input placeholder="Buscar" value={search} className="form-control border-secondary rounded-pill " onChange={e => setSearch(e.target.value)} label="Buscar" />
                    </form>
                </div>
                <h5 className="text-white text-center">Filtro</h5>
                <section className="text-white d-flex justify-content-center border mx-5 pt-2 rounded-pill radios__ ">
                    <div className="text-center px-1">
                        <label htmlFor="student">Alunos</label>
                        <Input type="radio" value="alunos" checked={selectedOption === "alunos"} onChange={handleOptionChange} />
                    </div>
                    <div className="text-center px-1">
                        <label htmlFor="student">Professores</label>
                        <Input type="radio" value="professores" checked={selectedOption === 'professores'} onChange={handleOptionChange} />
                    </div>
                    <div className="text-center px-1">
                        <label htmlFor="student">Turmas</label>
                        <Input type="radio" value="turmas" checked={selectedOption === 'turmas'} onChange={handleOptionChange} />
                    </div>
                </section>
                <div className="list_div border mt-5 mx-5 text-white">
                    <p>{searchError}</p>
                    {requisitionData ? (
                        <div>
                            {requisitionData.map((info) => (
                                <div className="border m-3 px-2 info__ justify-content-between " key={info.id}>
                                    <p className="m-2">{info.nome ? (`Nome: ${info.nome}`) : (`Turma: ${info.turma}`)}</p>
                                    <p className="m-2">{info.matricula ? (`Matrícula: ${info.matricula}`) : (null)}</p>
                                    <Link to={`/${selectedOption}/${info.id}`}> <button className="btn btn-light px-3 me-2 my-2">info</button></Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-5 text-center">{loadingScreen}</p>
                    )
                    }
                </div>
            </div>
        </main >
    )
}

export default Home