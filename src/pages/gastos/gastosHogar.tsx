import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LISTAR_GASTO_COMPRA } from '../../api/queries/paymentQueries';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import dayjs from 'dayjs';
import { GastoCompra } from '../../types/types';

interface Props {
  casaId: string;
}

type Order = 'asc' | 'desc';

const GastosDelHogar: React.FC<Props> = ({ casaId }) => {
  const { loading, error, data } = useQuery(LISTAR_GASTO_COMPRA, {
    variables: { casaId },
  });

  const [order, setOrder] = useState<Order>('asc');

  const handleSort = () => {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const gastos: GastoCompra[] = (data?.listarGastoCompra || [])
    .filter((gasto: GastoCompra) => gasto.valorTotalCompartido > 0)
    .sort((a, b) => {
      const dateA = new Date(a.fechaRegistro).getTime();
      const dateB = new Date(b.fechaRegistro).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <Box>
      <Typography variant="h6" color="black" sx={{ mb: 2 }}>
        Gastos del Hogar
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={handleSort}
                >
                  <strong>Fecha de Registro</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell><strong>Valor Compartido</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gastos.map((gasto) => (
              <TableRow key={gasto.id}>
                <TableCell>{gasto.descripcion || 'Sin descripción'}</TableCell>
                <TableCell>{dayjs(gasto.fechaRegistro).format('YYYY-MM-DD')}</TableCell>
                <TableCell>${gasto.valorTotalCompartido.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GastosDelHogar;
