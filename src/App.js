import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import SideMenu from './components/SideMenu';
import Nav from './components/Navbar';
import VisualisationContainer from './components/VisualisationContainer';
import Heatmap from './components/Heatmap';
import { csv } from 'd3-fetch';
import QuantMetric from './components/QuantMetric';
import data from './Data.csv';
import { useState, useEffect } from 'react';
import SpiderChart from './components/SpiderChart';
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import ReactGridLayout from 'react-grid-layout';

function App() {
  const [datasetSize, setDatasetSize] = useState(0);
  const [attributeSize, setAttributeSize] = useState(0);
  const [communitySize, setCommunitySize] = useState(0);
  const [methodSize, setMethodSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);

  const [attributeList, setAttributeList] = useState([]);
  const [communityList, setCommunityList] = useState([]);

  const morphable = 'RQ1 - Scalar attributes - Morphable ';
  const customisability = 'RQ1 - Scalar attributes - Customisability';
  const automaticity = 'RQ1 - Scalar attributes - Automaticity';
  const expressivity = 'RQ1 - Scalar attributes - Expressivity';
  const adaptive = 'RQ1 - Scalar attributes - Expressivity';
  const practicality = 'RQ1 - Scalar attributes - Practicality';
  const combined = 'RQ1 - Scalar attributes - Combined ';
  const parallel = 'RQ1 - Scalar attributes - Parallel ';

  const BVI = 'RQ3 - Community of Focus  - BVI';
  const DHH = 'RQ3 - Community of Focus  - DHH';
  const motor = 'RQ3 - Community of Focus  - Motor';
  const autism = 'RQ3 - Community of Focus  - Autism';
  const IDD = 'RQ3 - Community of Focus  - IDD';
  const cognitive = 'RQ3 - Community of Focus  - Other cognitive';
  const elderly = 'RQ3 - Community of Focus  - Older adults';
  const general = 'RQ3 - Community of Focus  - General disability';
  const other = 'RQ3 - Community of Focus  - Other';

  const [attributeCounts, setAttributeCounts] = useState([]);
  const [communityCounts, setCommunityCounts] = useState([]);


  useEffect(() => {
    getQuantMetrics();
  }, [])

  async function getQuantMetrics() {
    const CSVdata = await csv(data);
    setDatasetSize(Object.keys(CSVdata).length - 1);

    const morphableCol = CSVdata.map(row => row[morphable]);
    const customisableCol = CSVdata.map(row => row[customisability]);
    const automaticityCol = CSVdata.map(row => row[automaticity]);
    const expressivityCol = CSVdata.map(row => row[expressivity]);
    const adaptiveCol = CSVdata.map(row => row[adaptive]);
    const practicalityCol = CSVdata.map(row => row[practicality]);
    const combinedCol = CSVdata.map(row => row[combined]);
    const parallelCol = CSVdata.map(row => row[parallel]);

    const BVICol = CSVdata.map(row => row[BVI]);
    const DHHCol = CSVdata.map(row => row[DHH]);
    const motorCol = CSVdata.map(row => row[motor]);
    const autismCol = CSVdata.map(row => row[autism]);
    const IDDCol = CSVdata.map(row => row[IDD]);
    const cognitiveCol = CSVdata.map(row => row[cognitive]);
    const elderlyCol = CSVdata.map(row => row[elderly]);
    const generalCol = CSVdata.map(row => row[general]);
    const otherCol = CSVdata.map(row => row[other]);

    const attributeCols = [
        morphableCol, customisableCol, automaticityCol, expressivityCol, adaptiveCol,
        practicalityCol, combinedCol, parallelCol
      ]

    const communityCols = [
      BVICol, DHHCol, motorCol, autismCol, IDDCol, cognitiveCol,
      elderlyCol, generalCol, otherCol
    ]

    const attributes = CSVdata.columns.filter(attribute => 
        attribute.startsWith('RQ1 - Scalar attributes')
    ).map(attribute => attribute.slice(26))
    setAttributeList(attributes)
    setAttributeSize(attributes.length);
    
    const communities = CSVdata.columns.filter(community =>
        community.startsWith('RQ3 - Community of Focus')
    ).map(community => community.slice(28))
    setCommunityList(communities)
    setCommunitySize(communities.length);

    const methods = CSVdata.columns.filter(method =>
        method.startsWith('RQ2 - User study method')
    ).length
    setMethodSize(methods);

    const outputs = CSVdata.columns.filter(output =>
        output.startsWith('RQ1 - Output modality')
    ).length
    setOutputSize(outputs);

    const attributeCounts = [];
    const communityCounts = [];

    for (var attrIndex = 0; attrIndex < attributeCols.length; attrIndex++) {
      const count = await getCount(attributeCols[attrIndex]);
      attributeCounts.push(count);
    }

    for (var commIndex = 0; commIndex < communityCols.length; commIndex++) {
      const count = await getCount(communityCols[commIndex]);
      communityCounts.push(count);
    }

    setAttributeCounts(attributeCounts);
    setCommunityCounts(communityCounts);
  }

  async function getCount(col) {
    const count = col.reduce((count, value) => {
      const ones = value.toString().split('').filter(digit => digit === '1').length;
      return count + ones;
    }, 0);

    return count;
  }

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
              <Row>
                <Col xs="8">
                  <Container style={{ 
                    'boxShadow': '0px 4.5px 50.75px 0px rgba(0, 0, 0, 0.25)', 
                    'borderRadius': '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <div className='container-heading'>Attribute-Community Frequency Mapping</div>
                  </Container>
                </Col>
                <Col xs="4">
                <Container style={{ 
                    boxShadow: '0px 4.5px 50.75px 0px rgba(0, 0, 0, 0.25)', 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    <div className='container-heading'>Composition</div>
                    <SpiderChart id='1' labels={attributeList} data={attributeCounts} />
                    <SpiderChart id='2' labels={communityList} data={communityCounts} />
                  </Container>
                </Col>
              </Row>
              <Row>
                  <Col xs="12">
                  <Container 
                style={{ 
                    boxShadow: '0px 4.5px 50.75px 0px rgba(0, 0, 0, 0.25)', 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '1rem',
                    marginTop: '1rem'
                  }}>
                  <QuantMetric title="Total Papers" value={datasetSize} />
                    <QuantMetric title="Communities" value={communitySize} />
                    <QuantMetric title="Scalar Attributes" value={attributeSize} />
                    <QuantMetric title="User Study Methods" value={methodSize} />
                    <QuantMetric title="Output Modalities" value={outputSize} />
              </Container>
                  </Col>
              </Row>
              <Row></Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
