import React from 'react'
import { Grid } from '@mui/material'

import dynavox from '../img/dynavox.png'
import alphasmart from '../img/alphasmart.png'
import lightwriter from '../img/lightwriter.png'
import bigmack from '../img/bigmack.png'
import liberator from '../img/liberator.png'

function ImageGrid() {
  return (
    <div style={{ float: 'right' }}>
        <Grid container spacing={2} sx={{ padding: '1rem' }}>
            <Grid item xs={7}>
                <img src={dynavox} alt='DynaVox' height='130px' />
            </Grid>
            <Grid item xs={5}>
                <img src={lightwriter} alt="LightWriter" height='110px' />
            </Grid>
            <Grid item xs={3}>
                <img src={liberator} alt="Liberator" height='70px' />
            </Grid>
            <Grid item xs={4}>
                <img src={bigmack} alt="BIGMack" height='80px' />
            </Grid>
            <Grid item xs={5}>
                <img src={alphasmart} alt="AlphaSmart" height='80px' />
            </Grid>
        </Grid>
    </div>
  )
}

export default ImageGrid