import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './components.css'

function SideMenu() {
  return (
    <Container fluid className="d-flex flex-column h-100" style={{ backgroundColor: '#f5f5f5', padding: '1rem' }}>
        <div className='heading'>AAC Visualisation Repository</div>
        <div className='para'>This repository houses a diverse collection of research papers, 
        providing insights into the latest advancements and methodologies in the field.</div>
    </Container>
  )
}

export default SideMenu