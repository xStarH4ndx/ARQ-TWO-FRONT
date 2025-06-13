import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
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
  const [listarInventario, { loading, data, error, refetch }] =
    useLazyQuery<{ listarInventario: Inventario[] }>(LISTAR_INVENTARIO);

  const [obtenerProducto] = useLazyQuery<{ obtenerProducto: Producto }>(OBTENER_PRODUCTO, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const prod = data.obtenerProducto;
      setDetallesProductos((prev) => ({
        ...prev,
        [prod.id]: {
          descripcion: prod.descripcion || '',
          categoria: prod.categoria,
        },
      }));
    },
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Inventario | null>(null);
  const [detallesProductos, setDetallesProductos] = useState<
    Record<string, { descripcion: string; categoria: string }>
  >({});

  useEffect(() => {
    if (casaId.trim() !== '') {
      listarInventario({ variables: { casaId } }).then((res) => {
        const inventario = res.data?.listarInventario || [];

        inventario.forEach((item) => {
          const id = item.productoId;
          if (!detallesProductos[id]) {
            obtenerProducto({ variables: { id } });
          }
        });
      });
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
    refetch?.();
  };

  return (
    <Box>
      {loading && (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">Error al cargar inventario.</Typography>}

      <Grid container spacing={2} mt={2}>
        {data?.listarInventario.map((item) => {
          const detalles = detallesProductos[item.productoId];
          const borderColor = detalles ? getBorderColor(detalles.categoria) : 'gray';

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
                  {detalles && (
                    <>
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
                    </>
                  )}
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
