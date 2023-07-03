import React, { useState, useEffect } from 'react'
import './components.css'

function QuantMetric(props) {
  return (
    <div className='quantitative-data'>
        <div className='quant-title'>{props.title}</div>
        <div className='quant-value'>{props.value}</div>
    </div>
  )
}

export default QuantMetric