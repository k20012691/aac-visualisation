import React from 'react'
import { Grid, Tooltip } from '@mui/material'

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
                <Tooltip title="Dynavox" arrow>
                <img src={dynavox} alt='DynaVox' height='130px' />
                </Tooltip>
            </Grid>
            <Grid item xs={5}>
                <Tooltip title="LightWriter" arrow>
                <img src={lightwriter} alt="LightWriter" height='110px' />
                </Tooltip>
            </Grid>
            <Grid item xs={3}>
                <Tooltip title="Liberator" arrow>
                <img src={liberator} alt="Liberator" height='70px' />
                </Tooltip>
            </Grid>
            <Grid item xs={4}>
                <Tooltip title="BIGMack" arrow>
                <img src={bigmack} alt="BIGMack" height='80px' />
                </Tooltip>
            </Grid>
            <Grid item xs={5}>
                <Tooltip title="AlphaSmart" arrow>
                <img src={alphasmart} alt="AlphaSmart" height='80px' />
                </Tooltip>
            </Grid>
        </Grid>
    </div>
  )
}

export default ImageGrid