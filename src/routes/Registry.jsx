import "../styles/registry.css"
import { Link } from "react-router-dom"
function Registry() {
    return (
        <>
            <main>
                <section className='d-flex wrap mt-5 justify-content-center flex-wrap'>
                    <div className="div_registry m-3 rounded">
                        <h3 className="text-center text-white">Aluno</h3>
                        <Link to="/new/aluno"><button className="btn btn-light m-5">Cadastrar</button></Link>
                        
                    </div>
                    <div className="div_registry m-3 rounded">
                        <h3 className="text-center text-white">Professor</h3>
                        <Link to="/new/professor"><button className="btn btn-light m-5">Cadastrar</button></Link>
                    </div>
                    <div className="div_registry m-3 rounded">
                        <h3 className="text-center text-white ">Turma</h3>
                        <Link to="/new/turma"><button className="btn btn-light m-5">Cadastrar</button></Link>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Registry