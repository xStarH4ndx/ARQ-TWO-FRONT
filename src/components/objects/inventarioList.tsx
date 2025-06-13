import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { LISTAR_INVENTARIO } from '../../api/queries/inventoryQueries';
import { Inventario } from '../../types/types';

interface InventarioListProps {
  onItemSeleccionado?: (item: Inventario) => void;
}

const InventarioList: React.FC<InventarioListProps> = ({ onItemSeleccionado }) => {
  const [casaId, setCasaId] = useState('');
  const [listarInventario, { loading, data, error }] = useLazyQuery<{ listarInventario: Inventario[] }>(LISTAR_INVENTARIO);

  const handleBuscarInventario = () => {
    if (casaId.trim() !== '') {
      listarInventario({ variables: { casaId } });
    }
  };

  return (
    <Box>
      {/* Filtro por ID de casa */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <TextField
          label="ID de la Casa"
          variant="outlined"
          size="small"
          value={casaId}
          onChange={(e) => setCasaId(e.target.value)}
          sx={{
            backgroundColor: '#e9ecef',
            input: { color: 'black' },
            label: { color: 'black' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ced4da' },
              '&:hover fieldset': { borderColor: '#6c757d' },
              '&.Mui-focused fieldset': { borderColor: '#495057' },
            },
            width: '300px',
          }}
        />
        <Button variant="contained" onClick={handleBuscarInventario}>
          Buscar Inventario
        </Button>
      </Stack>

      {/* Estado de carga y errores */}
      {loading && <Box textAlign="center"><CircularProgress /></Box>}
      {error && <Typography color="error">Error al cargar inventario.</Typography>}

      {/* Inventario */}
      <Grid container spacing={2}>
        {data?.listarInventario.map((item) => (
          <Grid key={item.productoId}>
            <Card
              sx={{
                height: 160,
                width: 240,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{item.nombreProducto}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Producto ID: {item.productoId}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Stock: {item.cantidadStock}
                </Typography>
              </CardContent>
              {onItemSeleccionado && (
                <CardActions>
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    onClick={() => onItemSeleccionado(item)}
                  >
                    Seleccionar
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InventarioList;
