import { ClassRoom } from "../entities/ClassRoom"
import { useState, useEffect, useLayoutEffect } from 'react';
import { AxiosApi } from "../services/RequisitionAPI"
import { Link, useNavigate } from 'react-router-dom';
import "../styles/info.css"
import Input from '../components/Input';

function ClassInfo() {
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState("true");
    const [isEditing, setIsEditing] = useState(false);
    const [deletingClassRoom, setDeletingClassRoom] = useState(false);
    const [editedThings, setEditedThings] = useState(false);

    const [loadgindState, setLoadgindState] = useState(false);

    const [handleState, setHandleState] = useState(0);
    const [classRoom, setClassRoom] = useState('')
    const [teacher, setTeacher] = useState('')
    const [year, setYear] = useState('')
    const [students, setStudents] = useState('')

    useEffect(() => {
        async function requisitionInfo() {
            AxiosApi.Get(window.location.pathname)
                .then((connection) => {
                    console.log(connection.data)
                    if (connection) {
                        console.log("aaaa")
                        setData(true)
                        console.log(data)
                    }

                    setLoadgindState(connection.data);
                    console.log(loadgindState)
                    if (data) {
                        setClassRoom(data.turma);
                        setYear(data.ano);
                        setStudents(data.alunos)
                        setHandleState(handleState + 1);
                        AxiosApi.Get(`/professores/${data.professor}`).then((connection) => {
                            if (connection.status == 200)
                                setTeacher(connection.data.nome)
                        })
                    }
                    setIsLoading("false");
                }).catch((connection) => {
                    console.log(connection)
                    if (connection.response.status == 404) {
                        setIsLoading("error");
                    } else {
                        alert("Erro Inesperado, Tente novamente mais tarde.")
                    }
                })
        }
        requisitionInfo();
    console.log(testando())

    }, [])
    console.log(teacher)
    console.log(handleState)
    if (isLoading == "true") {
        return(
            <main>
                <p className="text-white">Carregando informações da Turma...</p>;
            </main>
        ) 
    } else if (isLoading == "error") {
        return (
            <main className='text-center text-white'>
                <h1>Erro 404!</h1>
                <h4>Turma não encontrada.</h4>
                <div className='mt-4 mb-5'>
                    <Link to="/"><button className='btn-light btn'>Voltar para Tela Inicial</button></Link>
                </div>
            </main>
        )
    }
    

    const handleEditClick = () => {
        setIsEditing(true);
        setHandleState(handleState + 1);

    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedThings(false);
    };

    const handleSaveClick = async () => {
        // let getInfo = await AxiosApi.Get(window.location.pathname);
        // const newInfos = new Teacher(name, cpf, register, getInfo.data.turma);
        // await AxiosApi.Put(window.location.pathname, newInfos);
        setEditedThings(true);
        setIsEditing(false);
        setHandleState(handleState + 1);
    };

    const handleDeleteTeacher = () => {
        setDeletingClassRoom(true);
        setEditedThings(false);
    }

    async function handleDelete() {
        // alert(await TeacherUseCases.DeleteTeacher(window.location.pathname));
        return navigate('/')
    }

    if (deletingClassRoom) {
        return (
            <main className='mb-5 text-center text-white'>
                <h5>A exclusão do cadastro é irreversível.</h5>
                <p>Tem certeza que deseja deletar o cadastro?</p>
                <button className='btn btn-danger' onClick={handleDelete}>Deletar</button>
                <button className='btn btn-light ms-5' onClick={() => setDeletingClassRoom(false)}>Cancelar</button>
            </main>
        )
    }
    if (!loadgindState) {
        return <p>Carregando...</p>;
    }
    else {
        return (
            <main>
                {isEditing ? (
                    <div className='mb-5 text-center'>
                        <div className='d-flex justify-content-center'>
                            <form className=" py-5 ms-5">
                                {/* <Input placeholder="Nome Completo" className="form-control border-secondary __input" htmlFor="FullName" label="Nome Completo" value={name} onChange={e => setName(e.target.value)} />
                                <Input mask="999.999.999-99" placeholder="CPF" className="form-control border-secondary __input" htmlFor="CPF" label="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
                                <Input placeholder="Registro" className="form-control border-secondary __input" htmlFor="register" label="Registro" value={register} onChange={e => setRegister(e.target.value)} /> */}
                            </form>
                        </div>
                        <div>
                            <button className='btn-success btn mx-5 m-1' onClick={handleSaveClick}>Salvar</button>
                            <button className='btn-light btn m-1' onClick={handleCancelClick}>Cancelar</button>
                        </div>

                    </div>
                ) : (
                    <div className='mb-5 mx-3 text-white'>
                        <div className='text-center mb-5'>
                            <div>
                                {editedThings ? (
                                    <p className='text-success text-center mt-5'>Cadastro Alterado com sucesso!</p>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        </div>

                        <h2 className="p-2 border rounded text-center mb-5">Turma {data.turma}</h2>
                        <p className="mb-4">Professor: {teacher}</p>
                        <p className="mb-4">Ano: {year}º</p>
                        <section>
                            <div>
                                {/* {students ? (
                                    <div>
                                        {students.map(students => (
                                            <div key={students.id}>
                                                <h2>{data.nome}</h2>
                                                <p>{data.matricula}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Carregando informações dos alunos...</p>
                                )} */}
                            </div>
                        </section>
                        <div className='d-flex justify-content-between mt-5'>
                            <div>
                                <button className='btn btn-light mx-2' onClick={handleEditClick}>Editar cadastro</button>

                            </div>
                            <div>
                                <button className='btn btn-danger mx-2' onClick={handleDeleteTeacher}>Deletar Cadastro</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        );
    }
}

export default ClassInfo