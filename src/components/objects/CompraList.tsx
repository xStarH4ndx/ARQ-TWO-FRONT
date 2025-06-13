import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LISTAR_COMPRAS, ELIMINAR_COMPRA } from '../../api/queries/inventoryQueries';
import {
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Box,
  Button,
} from '@mui/material';
import { Compra } from '../../types/types';

interface ComprasListProps {
  casaId: string;
  refreshKey?: number;
}

type Order = 'asc' | 'desc';

const ComprasList: React.FC<ComprasListProps> = ({ casaId, refreshKey }) => {
  const { loading, error, data, refetch } = useQuery<{ listarCompras: Compra[] }>(LISTAR_COMPRAS, {
    variables: { casaId },
  });

  useEffect(() => {
    if (refreshKey !== undefined) {
      refetch();
    }
  }, [refreshKey, refetch]);

  const [eliminarCompra] = useMutation(ELIMINAR_COMPRA);
  const [order, setOrder] = useState<Order>('desc');

  const handleSortRequest = () => {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleEliminar = async (id: string) => {
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar esta compra?');
    if (!confirmado) return;

    try {
      await eliminarCompra({
        variables: { id },
      });
      window.alert('Compra eliminada con éxito');
      refetch();
    } catch (err) {
      console.error('Error al eliminar la compra:', err);
      window.alert('Ocurrió un error al eliminar la compra');
    }
  };

  const sortedCompras = data?.listarCompras
    ? [...data.listarCompras].sort((a, b) => {
        const dateA = new Date(a.fechaCompra).getTime();
        const dateB = new Date(b.fechaCompra).getTime();
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      })
    : [];

  if (loading) return <CircularProgress />;
  if (error) console.error('Error al cargar las compras:', error);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom color="black">
        Lista de Compras
      </Typography>

      {sortedCompras.length > 0 ? (
        <Paper sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={order}
                    onClick={handleSortRequest}
                  >
                    Fecha de Compra
                  </TableSortLabel>
                </TableCell>
                <TableCell>Productos</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCompras.map((compra) => (
                <TableRow key={compra.id}>
                  <TableCell>{new Date(compra.fechaCompra).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {compra.itemsCompra.map((item, index) => (
                      <Box key={index} sx={{ marginBottom: 1 }}>
                        <Typography variant="body2">
                          {item.nombreProducto} ({item.cantidad} × ${item.precioUnitario})
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.esCompartido
                            ? 'Compartido'
                            : `Individual${item.propietarioId ? ` - Propietario: ${item.propietarioId}` : ''}`}
                        </Typography>
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleEliminar(compra.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Typography variant="body1" color='black'>No hay compras registradas aún.</Typography>
      )}
    </Box>
  );
};

export default ComprasList;
