import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav>
            <Link className="m-4 link__router" to="/"><button className="btn btn-light">HOME</button></Link>
            <Link className="m-1 link__router" to="/cadastro"><button className="btn btn-light">Cadastrar</button></Link>
        </nav>
    )
}

export default Navbar;