import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import data from '../Data.csv'
import { csv } from 'd3-fetch'
import { Container, Grid } from '@mui/material';
import Heatmap from './Heatmap';
import TargetUsers from './TargetUsers';
import YearlyPublications from './YearlyPublications';
import SpiderChart from './SpiderChart';

function Analytics() {
  const [database, setDatabase] = useState([]);

  async function getData() {
    try {
      const fetchedData = await csv(data);
      console.log('Fetched data:', fetchedData);
      setDatabase(fetchedData);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }

  function getAttributeCounts() {
    var counts = [];
    if (database.length > 0) {
      const attributes = database.columns.filter(col => col.startsWith('RQ1 - Scalar attributes'))
      for (var attrIndex in attributes) {
        const attr = attributes[attrIndex];
        if (!counts[attr]) {
          counts[attr] = 0;
        }
        for (var paperIndex in database) {
          const paper = database[paperIndex];
          if (paper[attr] === '1') {
            counts[attr] += 1
          }
        }
        
      }
    }
    return counts;
  }

  function getCommunityCounts() {
    var counts = [];
    if (database.length > 0) {
      const attributes = database.columns.filter(col => col.startsWith('RQ3 - Community of Focus'))
      for (var attrIndex in attributes) {
        const attr = attributes[attrIndex];
        if (!counts[attr]) {
          counts[attr] = 0;
        }
        for (var paperIndex in database) {
          const paper = database[paperIndex];
          if (paper[attr] === '1') {
            counts[attr] += 1
          }
        }
        
      }
    }
    return counts;
  }

  function getQuantMetrics() {
    if (database.length > 0) {
      const totalPapers = database.length;
      const communities = database.columns.filter(col => col.startsWith('RQ3 - Community of Focus')).length;
      const userStudyMethods = database.columns.filter(col => col.startsWith('RQ2 - User study method')).length;
      const attributes = database.columns.filter(col => col.startsWith('RQ1 - Scalar attribute')).length;
      const outputs = database.columns.filter(col => col.startsWith('RQ1 - Output modality')).length;

      return [totalPapers, communities, userStudyMethods, attributes, outputs]
    }
  }
  
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(getQuantMetrics())
  }, [database])

  return (
    <div>
      <NavBar />
      <Grid container spacing={2} sx={{ padding: '1rem' }} alignItems='stretch'>
        <Grid item xs={8}>
          <Container>
            <YearlyPublications database={database} />
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Container sx={{ padding: '1rem' }} maxWidth={false}>
            <TargetUsers database={database} />
          </Container>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Container sx={{ backgroundColor: '#DCC7FF', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              <span className='metric-title'>Total Papers</span>
              <span className='metric'>{getQuantMetrics() ? getQuantMetrics()[0] : ''}</span>
            </Container>
            <Container sx={{ backgroundColor: '#A7D1F1', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              <span className='metric-title'>Communities</span>
              <span className='metric'>{getQuantMetrics() ? getQuantMetrics()[1] : ''}</span>
            </Container>
            <Container sx={{ backgroundColor: '#A49AFF', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              <span className='metric-title'>User Study Methods</span>
              <span className='metric'>{getQuantMetrics() ? getQuantMetrics()[2] : ''}</span>
            </Container>
            <Container sx={{ backgroundColor: '#9DC6D0', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              <span className='metric-title'>Scalar Attributes</span>
              <span className='metric'>{getQuantMetrics() ? getQuantMetrics()[3] : ''}</span>
            </Container>
            <Container sx={{ backgroundColor: '#9BA9D8', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              <span className='metric-title'>Output Modalities</span>
              <span className='metric'>{getQuantMetrics() ? getQuantMetrics()[4] : ''}</span>
            </Container>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
              <SpiderChart id='1' labels={Object.keys(getAttributeCounts()).map(attr => attr.slice(26))} data={Object.values(getAttributeCounts())} />
              <span style={{ fontWeight: 500, fontSize: '15px' }}>Scalar Attribute Composition</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
              <SpiderChart id='2' labels={Object.keys(getCommunityCounts()).map(attr => attr.slice(28))} data={Object.values(getCommunityCounts())} />
              <span style={{ fontWeight: 500, fontSize: '15px' }}>Community Composition</span>
            </div>
          </Container>
        </Grid>
        <Grid item xs={8}>
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Heatmap 
                data={database} 
                attributes={Object.keys(getAttributeCounts()).map(attr => attr.slice(26))} 
                communities={Object.keys(getCommunityCounts()).map(attr => attr.slice(28))} 
              />
              <span style={{ fontWeight: 500 }}>Attribute-Community Frequency Mapping</span>
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

export default Analytics