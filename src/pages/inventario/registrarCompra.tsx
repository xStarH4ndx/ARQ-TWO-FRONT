import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
} from '@mui/material';
import ProductosList from '../../components/objects/ProductList';
import { Producto } from '../../types/types';
import { CREAR_COMPRA } from '../../api/queries/inventoryQueries';

interface ProductoEnCarrito extends Producto {
  cantidad: number;
  esCompartido: boolean;
  precioUnitario: number; // Asumimos que el precio unitario es un número
  propietarioId: string | null;
}

interface RegistrarCompraProps {
  casaId: string;  // Recibimos casaId desde el padre
}

const RegistrarCompra: React.FC<RegistrarCompraProps> = ({ casaId }) => {
  const [carrito, setCarrito] = useState<ProductoEnCarrito[]>([]);

  const [crearCompra, { loading, error }] = useMutation(CREAR_COMPRA);

  const agregarProductoAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [
        ...prev,
        { ...producto, cantidad: 1, esCompartido: false, precioUnitario: 0,propietarioId: null }
      ];
    });
  };

  const cambiarCantidad = (id: string, cantidad: number) => {
    if (cantidad < 1) return;
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
    );
  };

  const cambiarPrecioUnitario = (id: string, precioUnitario: number) => {
    if( precioUnitario < 0) return;
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, precioUnitario } : p))
    );
  };

  const cambiarEsCompartido = (id: string, esCompartido: boolean) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, esCompartido } : p
      )
    );
  };

  const eliminarProducto = (id: string) => {
    setCarrito((prev) => prev.filter(p => p.id !== id));
  };

  const handleRegistrarCompra = () => {
    const input = {
      casaId, // Usamos la prop aquí
      items: carrito.map(p => ({
        productoId: p.id,
        nombreProducto: p.nombre,
        cantidad: p.cantidad,
        precioUnitario: p.precioUnitario,
        esCompartido: p.esCompartido,
        propietarioId: p.esCompartido ? null : '111111',
        // propietarioId: p.esCompartido ? null : localStorage.getItem('userId'),
      })),
    };

    crearCompra({
      variables: { compra: input },
    })
      .then(() => {
        alert('Compra registrada con éxito');
        setCarrito([]);
      })
      .catch((err) => {
        console.error(err);
        alert('Error registrando compra');
      });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2} sx={{ color: 'black' }}>
        Selección de Productos
      </Typography>

      <ProductosList onProductoSeleccionado={agregarProductoAlCarrito} />

      <Box mt={4}>
        <Typography variant="h6" mb={1} sx={{ color: 'black' }}>
          Carrito de compra
        </Typography>

        {carrito.length === 0 ? (
          <Typography sx={{ color: 'black' }}>No hay productos seleccionados.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Compartido</TableCell>
                  <TableCell>Precio Unitario</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carrito.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.categoria}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={producto.cantidad}
                        onChange={(e) => cambiarCantidad(producto.id, Number(e.target.value))}
                        inputProps={{ min: 1 }}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={producto.esCompartido}
                        onChange={(e) => cambiarEsCompartido(producto.id, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={producto.precioUnitario}
                        onChange={(e) => cambiarPrecioUnitario(producto.id, Number(e.target.value))}
                        inputProps={{ min: 1 }}
                        sx={{ width: 80 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button color="error" onClick={() => eliminarProducto(producto.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegistrarCompra}
            disabled={carrito.length === 0 || loading}
          >
            {loading ? 'Registrando...' : 'Registrar Compra'}
          </Button>
          {error && (
            <Typography color="error" mt={1} sx={{ color: 'black' }}>
              Error al registrar la compra.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrarCompra;
