import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Divider, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import QueryStats from '@mui/icons-material/QueryStats';
import './components.css'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
            <Toolbar>
              <Link to='/aac-visualisation' style={{ textDecoration: 'none' }}>
                <Typography
                  variant='h6'
                  sx={{
                    color: '#000',
                    fontWeight: 600,
                    fontFamily: 'Inter'
                  }}
                >
                  AAC Review
                </Typography>
              </Link>
              <div className='buttons'>
                <Link to='/aac-visualisation/analytics'>
                  <Button 
                    variant='contained'
                    startIcon={<QueryStats />}
                    size='small'
                    sx={{
                      textTransform: 'none',
                      fontFamily: 'Inter',
                      color: '#656BFF',
                      backgroundColor: '#CCCEFF',
                      boxShadow: 'none'
                    }}
                  >
                    Analytics
                  </Button>
                </Link>
                <Button 
                  variant='contained'
                  startIcon={<MailOutlineIcon />}
                  size='small'
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Inter',
                    backgroundColor: '#656BFF',
                    boxShadow: 'none'
                  }}
                >
                  Contact Us
                </Button>
              </div>
            </Toolbar>
        </AppBar>
        <Divider sx={{
          borderColor: '#8089AC'
        }} />
    </Box>
  )
}

export default NavBar