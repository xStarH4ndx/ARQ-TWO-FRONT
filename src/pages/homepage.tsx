import { Typography, Paper } from '@mui/material';
import React from 'react';
import ChatIA from '../components/objects/ChatIA';

const HomePage: React.FC = () => {
  return (
    <Paper sx={{p: 4 ,backgroundColor: "#F4F5F7"}}>
        <Typography variant="h4" component="h1" gutterBottom color="black">
            Página de Inicio
        </Typography>
        <Typography variant="body1" gutterBottom color="black">
            Bienvenido a la página de inicio de nuestra aplicación. Aquí puedes encontrar información relevante y enlaces a otras secciones.
        </Typography>
        <Paper sx={{p :2}}>
          <ChatIA />
        </Paper>
    </Paper>
  );
}

export default HomePage;