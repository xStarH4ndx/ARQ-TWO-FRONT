import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import Navbar from './common/Navbar'
import SideBar from './common/SideBar'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {

  return (
    <Box sx={{ height: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto', overflow: 'hidden' }}>
      {/* Navbar */}
      <Navbar />

      {/* Contenido Principal con sidebars */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '300px 1fr', marginTop: 60},
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <SideBar/>

        {/* Main Content */}
        <Container sx={{ flexGrow: 1, p: 2, overflow: 'auto' }}>
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#385F71',
          color: 'white',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography variant="body2">&copy; 2025 ARQ-TEAM</Typography>
        <Typography variant="body2">All rights reserved</Typography>
      </Box>
    </Box>
  )
}

export default Layout
