import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HeaderNav() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Link className="m-4 link__router" to="/"><button className="bg-dark button"><h4>AGAPT</h4></button></Link>            
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Link className="m-1 link__router" to="/"><button className=" bg-dark button">HOME</button></Link>
              <Link className="m-1 link__router" to="/cadastro"><button className="bg-dark button">CADASTRO</button></Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default HeaderNav;



       // <nav className="navbar navbar-expand-lg">
        //     <div>
        //         <Link className="m-4 link__router" to="/"><button className="button"><h1>AGAPT</h1></button></Link>            
        //      </div>
        //     <div>
        //         <Link className="m-4 link__router" to="/"><button className="btn btn-light button">HOME</button></Link>
        //         <Link className="m-1 link__router" to="/cadastro"><button className="btn btn-light button">CADASTRO</button></Link>
        //     </div>
        // </nav>