import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import ComprasList from '../../components/objects/CompraList';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ComprasListWrapperProps {
  casaId: string;
}

const ComprasListWrapper: React.FC<ComprasListWrapperProps> = ({ casaId }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleActualizar = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Opcional: si quieres que cada vez que cambie casaId se refresque
  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [casaId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        onClick={handleActualizar}
        color="inherit"
        startIcon={<RefreshIcon />}
      >
        Actualizar
      </Button>

      <Box mt={2}>
        <ComprasList casaId={casaId} refreshKey={refreshKey} />
      </Box>
    </Box>
  );
};

export default ComprasListWrapper;
