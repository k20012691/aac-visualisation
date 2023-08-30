import { Box } from '@mui/material'
import React from 'react'
import './components.css'

function Paper(props) {
  return (
    <Box
        sx={{
            backgroundColor: '#f2f2f2',
            borderRadius: '5px',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between'
        }}
    >
        <div style={{ marginRight: '3rem' }}>{props.id}</div>
        <div style={{ 
            textAlign: 'left', display: 'flex', justifyContent: 'flex-start', flexGrow: '1'
         }}>
            <a href={props.link} target='_blank'>
                {props.name}
            </a>
            <div 
                className='icons' 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '10px', 
                    alignItems: 'center', 
                    marginLeft: '10px',
                }}>
                {props.icons}
            </div>
        </div>
        <div style={{ marginRight: '3rem' }}>{props.authors}</div>
        <div style={{ color: '#7a7a7a' }}>{props.year}</div>
    </Box>
  )
}

export default Paper