import { useState, useEffect, useLayoutEffect } from 'react';
import { AxiosApi } from "../services/RequisitionAPI"
import profile from "../assets/profile.jpg"
import { Student } from '../entities/Student';

const StudentInfo = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [deletingStudent, setDeletingStudent] = useState(false)

    const [dataState, setDataState] = useState(undefined)

    const [name, setName] = useState(data.nome);
    const [birthday, setBirthday] = useState('');
    const [cpf, setCpf] = useState('');
    const [registration, setRegistration] = useState('');



    useLayoutEffect(() => {
        async function requisitionInfo() {
            try {
                const connection = await AxiosApi.Get(window.location.pathname)
                setData(connection.data)
                setDataState(connection.data)
                console.log(dataState)
                console.log(name)
                setIsLoading(false)
            } catch (error) {
                alert('Erro inesperado, tente novamente mais tarde.')
            }

        }

        requisitionInfo()

    }, [])

    if (isLoading) {
        return <p>Carregando informações do aluno...</p>;
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        // Fazer a requisição para salvar as alterações
        setIsEditing(false);
    };

    if (deletingStudent) {
        return (
            <div className='mb-5 text-center'>
                <h5>A exclusão do cadastro é irreversível.</h5>
                <p>Tem certeza que deseja deletar o cadastro?</p>
                <button className='btn btn-danger' onClick={handleDelete}>Deletar</button>
                <button className='btn btn-dark ms-5' onClick={() => setDeletingStudent(false)}>Cancelar</button>
            </div>
        )
    }
    const handleDeleteStudent = () => {
        setDeletingStudent(true)

    }

    async function handleDelete() {
        let getInfo = await AxiosApi.Get(window.location.pathname)
        getInfo = getInfo.data
        const newInfos = new Student(name, birthday, cpf, registration, getInfo.turma)
        console.log(newInfos)
        // const connection = await AxiosApi.Put(window.location.pathname)
    }
    console.log(dataState)
    if (dataState === undefined) {
        return <p>Carregando...</p>;
    }
    else {


        return (
            <div>
                {isEditing ? (
                    <div className='mb-5'>
                        <div className='mb-5 text-center'>
                            <img src={profile} alt="" />
                        </div>
                        <div className='d-flex flex-column mb-3'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control border-secondary w-50" value={name} onChange={e => setName(e.target.value)} placeholder="Nome Completo" />
                                <label htmlFor='floatingFullName'>Nome Completo</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control border-secondary w-50" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Data de Nascimento" />
                                <label htmlFor='floatingFullName'>Data de Nascimento</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control border-secondary w-50" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" />
                                <label htmlFor='floatingFullName'>CPF</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control border-secondary w-50" value={registration} onChange={e => setRegistration(e.target.value)} placeholder="Matrícula" />
                                <label htmlFor='floatingFullName'>Matrícula</label>
                            </div>
                        </div>
                        <div>
                            <button className='btn-dark btn m-1' onClick={handleSaveClick}>Salvar</button>
                            <button className='btn-dark btn m-1' onClick={handleCancelClick}>Cancelar</button>
                        </div>

                    </div>
                ) : (
                    <div className='mb-5'>
                        <div className='text-center mb-5'>
                            <img src={profile} alt="" />
                        </div>
                        <p>Nome Completo: {data.nome}</p>
                        <p>Data de Nascimento: {data.dataNascimento}</p>
                        <p>CPF: {data.cpf}</p>
                        <p>Matrícula: {data.matricula}</p>
                        <p>Turma: {!data.turma ? "Aluno não matriculado em nenhuma turma." : data.turma}</p>
                        <button className='btn btn-dark' onClick={handleEditClick}>Editar Aluno</button>
                        <button className='btn btn-dark text-end' onClick={handleDeleteStudent}>Deletar Cadastro</button>

                    </div>
                )}
            </div>
        );
    }
};

export default StudentInfo;
