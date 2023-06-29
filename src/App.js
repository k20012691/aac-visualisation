import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import SideMenu from './components/SideMenu';
import Nav from './components/Navbar';
import VisualisationContainer from './components/VisualisationContainer';
import Heatmap from './components/Heatmap';
import { csv } from 'd3-fetch';

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
          <div className="h-100">
            <Container fluid>
              <Row className='flex-grow-1' style={{ height: '24rem' }}>
                <Col xs="9">
                  <VisualisationContainer title="Attribute-Community Frequency Mapping" text="Hello">
                    <Heatmap />
                  </VisualisationContainer>
                </Col>
                <Col xs="3">
                  <VisualisationContainer title="Composition" />
                </Col>
              </Row>
              <Row className='flex-grow-1' style={{ height: '8rem', marginTop: '1rem' }}>
                <Col xs="12">
                  <VisualisationContainer />
                </Col>
              </Row>
              <Row className='flex-grow-1' style={{ height: '10rem', marginTop: '1rem' }}>
  <Col xs="12">
    <VisualisationContainer />
  </Col>
</Row>

            </Container>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
