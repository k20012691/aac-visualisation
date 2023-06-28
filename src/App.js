import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import SideMenu from './components/SideMenu';
import Nav from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Container fluid className="d-flex flex-column h-100">
      <Row className="flex-grow-1">
        <Col xs="3" className="p-0">
          <div className="h-100 d-flex flex-column">
            <SideMenu />
          </div>
        </Col>
        <Col xs="9" className='p-0'>
          <Nav />
          <div className="h-100">Content</div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
