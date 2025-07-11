import React, { useState, useEffect } from 'react';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { LISTAR_INVENTARIO, OBTENER_PRODUCTO } from '../../api/queries/inventoryQueries';
import { Inventario, Producto } from '../../types/types';
import ActualizarCantidadModal from './actualizarCantidadModal';

interface InventarioListProps {
  casaId: string;
  onItemSeleccionado?: (item: Inventario) => void;
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

const InventarioList: React.FC<InventarioListProps> = ({ casaId, onItemSeleccionado }) => {
  const client = useApolloClient();
  console.debug(onItemSeleccionado);

  const [listarInventario] = useLazyQuery<{ listarInventario: Inventario[] }>(LISTAR_INVENTARIO, {
    fetchPolicy: 'no-cache',
  });

  const [obtenerProducto] = useLazyQuery<{ obtenerProducto: Producto }>(OBTENER_PRODUCTO, {
    fetchPolicy: 'network-only',
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Inventario | null>(null);
  const [detallesProductos, setDetallesProductos] = useState<
    Record<string, { descripcion: string; categoria: string }>
  >({});
  const [loadingManual, setLoadingManual] = useState(false);
  const [inventarioData, setInventarioData] = useState<Inventario[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const cargarInventarioYProductos = async () => {
    try {
      await client.clearStore(); // Limpia caché Apollo
      setLoadingManual(true);
      setError(null);
      setDetallesProductos({}); // Reinicia detalles

      const res = await listarInventario({ variables: { casaId } });
      const inventario = res.data?.listarInventario || [];
      setInventarioData(inventario);

      const promesas = inventario.map((item) =>
        obtenerProducto({ variables: { id: item.productoId } }).then((res) => {
          const prod = res.data?.obtenerProducto;
          if (prod) {
            return {
              id: prod.id,
              descripcion: prod.descripcion || 'Sin descripción',
              categoria: prod.categoria || 'Otros',
            };
          }
          return null;
        })
      );

      const resultados = await Promise.all(promesas);

      const nuevosDetalles: Record<string, { descripcion: string; categoria: string }> = {};
      resultados.forEach((detalle) => {
        if (detalle) {
          nuevosDetalles[detalle.id] = {
            descripcion: detalle.descripcion,
            categoria: detalle.categoria,
          };
        }
      });

      setDetallesProductos(nuevosDetalles);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoadingManual(false);
    }
  };

  useEffect(() => {
    if (casaId.trim() !== '') {
      cargarInventarioYProductos();
    }
  }, [casaId]);

  const abrirModal = (item: Inventario) => {
    setProductoSeleccionado(item);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  const onActualizado = () => {
    cargarInventarioYProductos();
  };

  return (
    <Box>
      {/* Botón Recargar */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={cargarInventarioYProductos}
          disabled={loadingManual}
        >
          Recargar
        </Button>
      </Box>

      {loadingManual && (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" mt={2}>
          Error al cargar inventario: {error.message}
        </Typography>
      )}

      <Grid container spacing={2} mt={2}>
        {inventarioData.map((item) => {
          const detalles = detallesProductos[item.productoId];
          if (!detalles) return null;

          const borderColor = getBorderColor(detalles.categoria);

          return (
            <Grid key={item.id}>
              <Card
                sx={{
                  width: 200,
                  height: 170,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderLeft: `8px solid ${borderColor}`,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Typography variant="h6" gutterBottom>
                    {item.nombreProducto}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Categoría: {detalles.categoria}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {detalles.descripcion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {item.cantidadStock}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="text"
                    color="warning"
                    onClick={() => abrirModal(item)}
                  >
                    Modificar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <ActualizarCantidadModal
        abierto={modalAbierto}
        onCerrar={cerrarModal}
        producto={productoSeleccionado}
        onActualizado={onActualizado}
      />
    </Box>
  );
};

export default InventarioList;
