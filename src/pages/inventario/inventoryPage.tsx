import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import RegistrarCompra from './registrarCompra';
import InventarioList from '../../components/objects/inventarioList';
import ComprasListWrapper from './compraPage';

const InventoryPage: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ p: 4, backgroundColor: '#F4F5F7', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom color="black">
        INVENTARIO
      </Typography>
      <Typography variant="body1" gutterBottom color="black">
        Bienvenido al sistema de inventario. Aquí podrás gestionar tus productos, registrar compras y consultar el historial de compras.
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, bgcolor: '#1e1e1e' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Inventario" />
          <Tab label="Registrar Compra" />
          <Tab label="Historial de Compra" />
        </Tabs>
      </Box>

      {/* Contenido según pestaña */}
      <Box mt={2}>
        {value === 0 && <InventarioList/>}
        {value === 1 && <RegistrarCompra />}
        {value === 2 && <ComprasListWrapper/>}
      </Box>
    </Paper>
  );
};

export default InventoryPage;
