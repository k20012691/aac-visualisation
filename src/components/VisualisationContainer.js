import React from 'react'
import './components.css'

function VisualisationContainer(props) {
  return (
    <div className='container'>
        <div className='container-heading'>{props.title}</div>
        <div>{props.children}</div>
    </div>
  )
}

export default VisualisationContainer