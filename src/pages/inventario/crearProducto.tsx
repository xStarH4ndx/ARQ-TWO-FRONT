import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  SelectChangeEvent,
} from '@mui/material';
import { gql, useMutation } from '@apollo/client';

const CREAR_PRODUCTO = gql`
  mutation CrearProducto($input: CrearProductoInputDto!) {
    crearProducto(input: $input)
  }
`;

const categoriasPredeterminadas = ['Alimentos', 'Limpieza', 'Otros'];

interface CrearProductoModalProps {
  open: boolean;
  onClose: () => void;
  onProductoCreado: () => void;
}

const CrearProductoModal: React.FC<CrearProductoModalProps> = ({ open, onClose, onProductoCreado }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: 'Alimentos',
    descripcion: '',
  });

  const [crearProducto, { loading, error }] = useMutation(CREAR_PRODUCTO);

  // Maneja cambios en inputs tipo TextField
  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Maneja cambios en Select (usando SelectChangeEvent)
  const manejarCambioSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCrearProducto = async () => {
    if (!nuevoProducto.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    try {
      await crearProducto({
        variables: {
          input: {
            nombre: nuevoProducto.nombre,
            categoria: nuevoProducto.categoria,
            descripcion: nuevoProducto.descripcion || null,
          },
        },
      });
      alert('Producto creado con éxito');
      setNuevoProducto({ nombre: '', categoria: 'Alimentos', descripcion: '' });
      onProductoCreado();
      onClose();
    } catch (e) {
      console.error(e);
      alert('Error creando producto');
    }
  };

  const handleCerrar = () => {
    setNuevoProducto({ nombre: '', categoria: 'Alimentos', descripcion: '' });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCerrar}
      aria-labelledby="modal-titulo"
      aria-describedby="modal-descripcion"
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-titulo" variant="h6" component="h2" mb={2}>
          Crear Producto Nuevo
        </Typography>

        <TextField
          label="Nombre"
          name="nombre"
          value={nuevoProducto.nombre}
          onChange={manejarCambioInput}
          fullWidth
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="select-categoria-label">Categoría</InputLabel>
          <Select
            labelId="select-categoria-label"
            name="categoria"
            value={nuevoProducto.categoria}
            label="Categoría"
            onChange={manejarCambioSelect}
          >
            {categoriasPredeterminadas.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Descripción"
          name="descripcion"
          value={nuevoProducto.descripcion}
          onChange={manejarCambioInput}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleCerrar} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleCrearProducto} disabled={loading}>
            {loading ? 'Creando...' : 'Crear Producto'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" mt={2}>
            Error al crear el producto.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default CrearProductoModal;
