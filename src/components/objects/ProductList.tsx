import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  CircularProgress,
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { LISTAR_PRODUCTOS } from '../../api/queries/inventoryQueries';
import { Producto } from '../../types/types';

interface ProductosListProps {
  onProductoSeleccionado: (producto: Producto) => void;
}

const getBorderColor = (categoria: string) => {
  switch (categoria.toLowerCase()) {
    case 'alimentos':
      return 'green';
    case 'limpieza':
      return 'skyblue';
    case 'otros':
      return 'gold';
    default:
      return 'gray';
  }
};

const categoriasPredeterminadas = ['Alimentos', 'Limpieza', 'Otros'];

const ProductosList: React.FC<ProductosListProps> = ({ onProductoSeleccionado }) => {
  const { data, loading, error } = useQuery<{ listarProductos: Producto[] }>(LISTAR_PRODUCTOS);

  const [searchNombre, setSearchNombre] = useState('');
  const [searchCategoria, setSearchCategoria] = useState('');

  const handleSeleccionar = (producto: Producto) => {
    onProductoSeleccionado(producto);
  };

  const handleCategoriaChange = (event: SelectChangeEvent) => {
    setSearchCategoria(event.target.value);
  };

  if (loading) return <Box mt={5} textAlign="center"><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error al cargar productos.</Typography>;

  const productosFiltrados = data?.listarProductos.filter((producto) => {
    const nombreMatch = producto.nombre.toLowerCase().includes(searchNombre.toLowerCase());
    const categoriaMatch = searchCategoria === '' 
      ? true 
      : producto.categoria.toLowerCase() === searchCategoria.toLowerCase();
    return nombreMatch && categoriaMatch;
  }) || [];

  return (
    <Box>
      {/* Buscadores */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          size="small"
          value={searchNombre}
          onChange={(e) => setSearchNombre(e.target.value)}
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
        <FormControl
          size="small"
          sx={{
            minWidth: 160,
            backgroundColor: '#e9ecef',
            '& .MuiInputLabel-root': { color: 'black' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ced4da' },
              '&:hover fieldset': { borderColor: '#6c757d' },
              '&.Mui-focused fieldset': { borderColor: '#495057' },
            },
          }}
        >
          <InputLabel shrink>Categoría</InputLabel>
          <Select
            value={searchCategoria}
            label="Categoría"
            onChange={handleCategoriaChange}
            displayEmpty
            sx={{ color: 'black' }}
          >
            <MenuItem value="">
              <em>Todas</em>
            </MenuItem>
            {categoriasPredeterminadas.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Lista de productos */}
      <Grid container spacing={2} mt={2}>
        {productosFiltrados.map((producto) => (
          <Grid key={producto.id}>
            <Card
              sx={{
                height: 170,
                width: 200,
                display: 'flex',
                flexDirection: 'column',
                borderLeft: `8px solid ${getBorderColor(producto.categoria)}`,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{producto.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoría: {producto.categoria}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {producto.descripcion || 'Sin descripción'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={() => handleSeleccionar(producto)}
                >
                  Seleccionar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductosList;
