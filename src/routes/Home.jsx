import { Link } from "react-router-dom"

function Home() {
    return (
        <main >
            <Link to="/alunos/1"> aluno 1</Link>
            <Link to="/alunos/2"> aluno 2</Link>
        </main>
    )
}

export default Home