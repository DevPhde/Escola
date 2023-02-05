import { Link } from "react-router-dom"

function Home() {
    return (
        <main >
            <Link to="/alunos/1"> aluno</Link>
            <Link to="/professores/3"> professor</Link>
            
        </main>
    )
}

export default Home