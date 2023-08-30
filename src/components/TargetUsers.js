import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './components.css'

function TargetUsers(props) {
    const database = props.database;
    const targetCommunities = ['cerebral palsy', 'autism', 'aphasia', 'motor impairments']
  
    function getCommunityCounts(community) {
        var count = 0;
        if (database.length > 0) {
          for (var paperIndex in database) {
            const communities = database[paperIndex]["Analytics - Community names "];
            if (typeof communities === 'string' && communities.toLowerCase().includes(community)) {
              count += 1
            }
          }
        }
        return count
    }

    function formatText(text) {
        const splitText = text.split(" ");
        return splitText.map(word => {
            return word[0].toUpperCase() + word.substring(1)
        }).join(" ");
    }

  return (
    <div>
        <Typography
            variant='h6'
            sx={{
                color: '#000',
                fontWeight: 500,
                fontFamily: 'Inter'
              }}
        >
            Target Users
        </Typography>
        <div id='para' style={{ fontSize: '13px', marginBottom: '1rem' }}>
            Niche communities analysed in current AAC research.
        </div>
        <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '8px',
            color: '#989898',
            marginBottom: '5px'
         }}>
            <span>Community</span>
            <span>Mentions</span>
        </div>
        {targetCommunities.map(community => (
            <Box
                sx={{
                    backgroundColor: '#ECECEC',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '5px'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '500', color: '#313131' }}>{formatText(community)}</span>
                    <span style={{ color: '#646464', fontSize: '12px' }}>{getCommunityCounts(community)}</span>
                </div>
            </Box>
        ))}
    </div>
  )
}

export default TargetUsers