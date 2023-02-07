import { useState, useEffect } from 'react';
import { AxiosApi } from "../services/RequisitionAPI"
import { Link, useNavigate } from 'react-router-dom';
import profile from "../assets/profile.webp"
import { Teacher } from '../entities/Teacher';
import { TeacherUseCases } from '../useCases/TeacherUseCases';
import "../styles/info.css"
import Input from '../components/Input';

function TeacherInfo() {
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState("true");
    const [isEditing, setIsEditing] = useState(false);
    const [deletingTeacher, setDeletingTeacher] = useState(false);
    const [editedThings, setEditedThings] = useState(false);

    const [loadgindState, setLoadgindState] = useState(false);

    const [handleState, setHandleState] = useState(0);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [register, setRegister] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function requisitionInfo() {
            AxiosApi.Get(window.location.pathname)
                .then((connection) => {
                    setData(connection.data);
                    setLoadgindState(connection.data);
                    if (data) {
                        setName(data.nome);
                        setCpf(data.cpf);
                        setRegister(data.registro);
                    }

                    setIsLoading("false");
                }).catch((connection) => {
                    if (connection.response.status == 404) {
                        setIsLoading("error");
                    } else {
                        alert("Erro Inesperado, Tente novamente mais tarde.")
                    }
                })
        }
        requisitionInfo();
    }, [handleState])

    if (isLoading == "true") {
        return <p>Carregando informações do Professor...</p>;
    } else if (isLoading == "error") {
        return (
            <main className='text-center text-white'>
                <h1>Erro 404!</h1>
                <h4>Professor não encontrado.</h4>
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
        let getInfo = await AxiosApi.Get(window.location.pathname);
        const newInfos = new Teacher(name, cpf, register, getInfo.data.turma);
        await AxiosApi.Put(window.location.pathname, newInfos);
        setEditedThings(true);
        setIsEditing(false);
        setHandleState(handleState + 1);
    };

    if (deletingTeacher) {
        return (
            <main className='mb-5 text-center text-white'>
                <h5>A exclusão do cadastro é irreversível.</h5>
                <p>Tem certeza que deseja deletar o cadastro?</p>
                <button className='btn btn-danger' onClick={handleDelete}>Deletar</button>
                <button className='btn btn-light ms-5' onClick={() => setDeletingTeacher(false)}>Cancelar</button>
            </main>
        )
    }

    const handleDeleteTeacher = () => {
        setDeletingTeacher(true);
        setEditedThings(false);
    }

    async function handleDelete() {
        alert(await TeacherUseCases.DeleteTeacher(window.location.pathname));
        return navigate('/')
    }

    if (!loadgindState) {
        return <p>Carregando...</p>;
    }
    else {
        return (
            <main>
                <div><Link to="/"><button className='btn-light btn'>Voltar</button></Link></div>
                {isEditing ? (
                    <div className='mb-5 text-center'>
                        <div className='mb-5 text-center rounded'>
                            <img src={profile} alt="profile" className='rounded-circle w-25' />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <form className=" py-5 ms-5">
                                <Input placeholder="Nome Completo" className="form-control border-secondary __input" htmlFor="FullName" label="Nome Completo" value={name} onChange={e => setName(e.target.value)} />
                                <Input mask="999.999.999-99" placeholder="CPF" className="form-control border-secondary __input" htmlFor="CPF" label="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
                                <Input placeholder="Registro" className="form-control border-secondary __input" htmlFor="register" label="Registro" value={register} onChange={e => setRegister(e.target.value)} />
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
                            <img src={profile} alt="profile" className='rounded-circle w-25' />
                            <div>
                                {editedThings ? (
                                    <p className='text-success text-center mt-5'>Cadastro Alterado com sucesso!</p>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        </div>

                        <p>Nome Completo: {data.nome}</p>
                        <p>CPF: {data.cpf}</p>
                        <p>Registro: {data.registro}</p>
                        <p>Turma: {!data.turma ? <b className="text-danger"> "Professor não cadastrado em nenhuma turma."</b> : data.turma} </p>
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
};

export default TeacherInfo