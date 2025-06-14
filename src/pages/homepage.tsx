import { Typography, Paper } from '@mui/material';
import React from 'react';
import ChatIA from '../components/objects/ChatIA';

const HomePage: React.FC = () => {
  return (
    <Paper sx={{p: 4 ,backgroundColor: "#F4F5F7"}}>
        <Typography variant="h4" component="h1" gutterBottom color="black">
            Recetas Online
        </Typography>
        <Typography variant="body1" gutterBottom color="black">
            Bienvenido a  Recetas Online, tu asistente personal para descubrir y compartir recetas de cocina. Aquí puedes interactuar con nuestra IA para encontrar recetas deliciosas y consejos culinarios.
        </Typography>
        <Paper sx={{p :2}}>
          <ChatIA />
        </Paper>
    </Paper>
  );
}

export default HomePage;