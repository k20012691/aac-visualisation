import React from 'react'
import { Container } from 'reactstrap'
import './components.css'

function PaperListView(props) {
  function getIcons() {
    const inputs = props.icons
    if (inputs.length > 2) {
        inputs = [inputs[0], inputs[1]]
    }
    return inputs;
  }

  return (
    <Container fluid 
        style={{ 
            display: 'flex', 
            flexDirection: 'row',
            backgroundColor: '#F5F5F5',
            borderRadius: '5px',
            fontFamily: 'Work Sans',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 1rem 0.5rem 1rem',
            fontSize: '15px'
        }}>
        <div>
            {props.id}.
        </div>
        <div id='title-icon' style={{ width: '400px', textAlign: 'left', marginLeft: '3rem', display: 'flex', alignItems: 'center' }}>
            <a href={props.link} target='_blank'>
                {props.title}
            </a>
            <div id='icon'>
                {props.icon}
            </div>
        </div>
        <div style={{ flex: 1 }}>
            {props.authors}
        </div>
        <div id='year'>
            {props.year}
        </div>
    </Container>
  )
}

export default PaperListView
