import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ComprasList from '../../components/objects/CompraList';

const ComprasListWrapper: React.FC = () => {
  const [inputCasaId, setInputCasaId] = useState('');
  const [casaId, setCasaId] = useState<string | null>(null);

  const handleBuscar = () => {
    if (inputCasaId.trim()) {
      setCasaId(inputCasaId.trim());
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="ID de la casa"
        value={inputCasaId}
        onChange={(e) => setInputCasaId(e.target.value)}
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" onClick={handleBuscar}>
        Buscar Compras
      </Button>

      {casaId && <ComprasList casaId={casaId} />}
    </Box>
  );
};

export default ComprasListWrapper;
