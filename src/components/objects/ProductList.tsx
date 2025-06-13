import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Producto } from '../../types/types';
import { LISTAR_PRODUCTOS } from '../../api/queries/inventoryQueries';

import CrearProductoModal from '../../pages/inventario/crearProducto';
import ProductoCard from './ProductCard';

const categoriasPredeterminadas = ['Alimentos', 'Limpieza', 'Otros'];

interface ProductosListProps {
  onProductoSeleccionado: (producto: Producto) => void;
}

const ProductosList: React.FC<ProductosListProps> = ({ onProductoSeleccionado }) => {
  const { data, loading, error, refetch } = useQuery<{ listarProductos: Producto[] }>(LISTAR_PRODUCTOS);

  const [searchNombre, setSearchNombre] = useState('');
  const [searchCategoria, setSearchCategoria] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

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
      {/* Buscadores y botón crear */}
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
            onChange={(e) => setSearchCategoria(e.target.value)}
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

        <Button variant="contained" color='info' size='small' onClick={abrirModal} sx={{ height: 40 }}>
          Crear Producto
        </Button>
      </Stack>

      {/* Lista de productos */}
      <Grid container spacing={2} mt={2}>
        {productosFiltrados.map((producto) => (
          <Grid key={producto.id}>
            <ProductoCard producto={producto} onSeleccionar={onProductoSeleccionado} />
          </Grid>
        ))}
      </Grid>

      {/* Modal Crear Producto */}
      <CrearProductoModal
        open={modalOpen}
        onClose={cerrarModal}
        onProductoCreado={refetch}
      />
    </Box>
  );
};

export default ProductosList;
