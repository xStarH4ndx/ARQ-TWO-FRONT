import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  SelectChangeEvent,  // <-- importar tipo correcto
} from '@mui/material';
import RegistrarCompra from './registrarCompra';
import InventarioList from '../../components/objects/inventarioList';
import ComprasListWrapper from './compraPage';
import CasaSelector from '../../components/objects/casaSelector'; // importa el nuevo componente

const InventoryPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [casaSeleccionada, setCasaSeleccionada] = useState('1234'); // default primera casa

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Usar el tipo correcto para el evento
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
          INVENTARIO
        </Typography>

        <CasaSelector
          casaSeleccionada={casaSeleccionada}
          onCasaChange={handleCasaChange}
        />
      </Box>

      <Typography variant="body1" gutterBottom color="black">
        Bienvenido al sistema de inventario. Aquí podrás gestionar tus productos, registrar compras y consultar el historial de compras.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, bgcolor: '#1e1e1e' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Inventario" />
          <Tab label="Registrar Compra" />
          <Tab label="Historial de Compra" />
        </Tabs>
      </Box>

      <Box mt={2}>
        {value === 0 && <InventarioList casaId={casaSeleccionada} />}
        {value === 1 && <RegistrarCompra casaId={casaSeleccionada} />}
        {value === 2 && <ComprasListWrapper casaId={casaSeleccionada} />}
      </Box>
    </Paper>
  );
};

export default InventoryPage;
