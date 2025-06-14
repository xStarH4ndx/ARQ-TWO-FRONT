import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import CasaSelector from '../../components/objects/casaSelector';
// import MisGastos from './MisGastos';
import GastosDelHogar from './gastosHogar';
import ServiciosContratados from './serviciosPage';

const GastosPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [casaSeleccionada, setCasaSeleccionada] = useState('1234');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCasaChange = (event: SelectChangeEvent<string>) => {
    setCasaSeleccionada(event.target.value);
  };

  return (
    <Paper sx={{ p: 4, backgroundColor: '#F4F5F7', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h4" component="h1" color="black">
          GASTOS
        </Typography>

        <CasaSelector
          casaSeleccionada={casaSeleccionada}
          onCasaChange={handleCasaChange}
        />
      </Box>

      <Typography variant="body1" gutterBottom color="black">
        Aquí puedes ver y gestionar tus gastos individuales, los del hogar y los servicios contratados.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, bgcolor: '#1e1e1e' }}>
        <Tabs value={value} onChange={handleChange} centered>
          {/* <Tab label="Mis Gastos" /> */}
          <Tab label="Gastos del Hogar" />
          <Tab label="Servicios Contratados" />
        </Tabs>
      </Box>

      <Box mt={2}>
        {/* {value === 0 && <MisGastos casaId={casaSeleccionada} />} */}
        {value === 0 && <GastosDelHogar casaId={casaSeleccionada} />}
        {value === 1 && <ServiciosContratados casaId={casaSeleccionada} />}
      </Box>
    </Paper>
  );
};

export default GastosPage;
