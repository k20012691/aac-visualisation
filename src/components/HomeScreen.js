import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Container, Grid, createTheme } from '@mui/material'

import './components.css'
import data from '../Data.csv'
import { csv } from 'd3-fetch'
import PaperListView from './PaperListView'
import ImageGrid from './ImageGrid'

const theme = createTheme({
    paperContainer: {
        height: '40rem'
    }
})

function HomeScreen() {
    const [database, setDatabase] = useState([]);

    async function getData() {
        try {
            const fetchedData = await csv(data);
            setDatabase(fetchedData);
        }
        catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    useEffect(() => {
        getData();
    })

  return (
    <div>
        <NavBar />
        <Grid container spacing={2} sx={{ padding: '1rem' }}>
            <Grid item xs={7}>
                <Container id='borderless' style={{ marginTop: '2rem' }}>
                    <div id='para'>
                        This repository gathers an array of research papers that delve into the development, 
                        application, and outcomes of AAC devices, shedding light on their significance in enabling 
                        meaningful communication for people with various communication challenges.
                    </div><br />
                    <div id='para'>
                        These include the <span className='linked'>DynaVox</span>, used for picture-based communication and language support, 
                        and the <span className='linked'>BIGMack</span>, which acts as a single-message communication aid via voice recording.
                    </div>
                </Container>
            </Grid>
            <Grid item xs={5}>
                <Container id='borderless'>
                    <ImageGrid />
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Container sx={theme.paperContainer}>
                    <PaperListView database={database} />
                </Container>
            </Grid>
        </Grid>
    </div>
  )
}

export default HomeScreen