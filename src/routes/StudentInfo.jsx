import profile from "../assets/profile.jpg"
import { useEffect, useLayoutEffect, useState } from "react"
import { AxiosApi } from "../services/RequisitionAPI"



function StudentInfo() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function requisitionInfo() {
            try {
                const connection = await AxiosApi.Get(window.location.pathname)
                setData(connection.data)
            } catch (error) {
                alert('Erro inesperado, Tente novamente mais tarde!')
            }

        }

        requisitionInfo()

    }, [])

    // async function defineClass() {
    //     let infoClass = data.data.turma
    //     console.log(infoClass)

    // }
    // console.log(data.turma)

    return (
        <main className="border">
            <div className="">

                <div>
                    {data ? (
                        <div>
                            <div>
                                <img src={profile} alt="profile" width={'20%'} />
                            </div>
                            <p>Nome Completo: {data.nome}</p>
                            <p>Data de Nascimento: {data.dataNascimento}</p>
                            <p>Matrícula: {data.matricula}</p>
                            <p>Turma: {!data.turma ? "Aluno não matriculado em nenhuma turma." : data.turma}
                            </p>
                            <button className="btn btn-dark" onClick={a}>Excluir Aluno</button>
                        </div>
                    ) : (
                        <p>Carregando informações do aluno...</p>
                    )}
                </div>
            </div>
        </main>





    )
}

export default StudentInfo