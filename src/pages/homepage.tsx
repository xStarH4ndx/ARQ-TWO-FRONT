import React, { useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import ChatIA from '../components/objects/ChatIA';
import CasaSelector from '../components/objects/casaSelector';

const HomePage: React.FC = () => {
  const [casaSeleccionada, setCasaSeleccionada] = useState('1234'); // valor por defecto

  const handleCasaChange = (event: SelectChangeEvent<string>) => {
    setCasaSeleccionada(event.target.value as string);
  };

  return (
    <Paper sx={{ p: 4, backgroundColor: '#F4F5F7' }}>
      {/* Selector de casa */}
      <Box display='flex' justifyContent='flex-end' sx={{ mb: -5 }}>
        <CasaSelector casaSeleccionada={casaSeleccionada} onCasaChange={handleCasaChange} />
      </Box>
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Recetas Online
      </Typography>
      <Typography variant="body1" gutterBottom color="black">
        Bienvenido a Recetas Online, tu asistente personal para descubrir y compartir recetas de cocina. Aquí puedes interactuar con nuestra IA para encontrar recetas deliciosas y consejos culinarios.
      </Typography>


      <Paper sx={{ p: 2 }}>
        <ChatIA casaId={casaSeleccionada} />
      </Paper>
    </Paper>
  );
};

export default HomePage;
