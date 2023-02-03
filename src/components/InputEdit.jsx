import React, { useState, useEffect } from 'react';
import { AxiosApi } from "../services/RequisitionAPI"
import profile from "../assets/profile.jpg"

const StudentInfo = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function requisitionInfo() {
            try {
                const connection = await AxiosApi.Get(window.location.pathname)
                setData(connection.data)
                setIsLoading(false)
            } catch (error) {
                alert(error)
            }

        }

        requisitionInfo()

    }, [])

    if (isLoading) {
        return <p>Carregando aluno...</p>;
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

    return (
        <div>
            {isEditing ? (
                <div className='d-flex'>
                    <img src={profile} alt="" />
                    <input className='m-1' type="text" value={data.nome} />
                    <input type="text" value={data.dataNascimento} />
                    <input type="text" value={data.matricula} />
                    <button onClick={handleSaveClick}>Salvar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </div>
            ) : (
                <div className='mb-5'>
                    <img src={profile} alt="" />
                    <p>Nome Completo: {data.name}</p>
                    <p>Data de Nascimento: {data.age}</p>
                    <p>Matrícula: {data.email}</p>
                    <p>Turma: {!data.turma ? "Aluno não matriculado em nenhuma turma." : data.turma}</p>
                    <button className='btn btn-dark' onClick={handleEditClick}>Editar Aluno</button>
                </div>
            )}
        </div>
    );
};

export default StudentInfo;
