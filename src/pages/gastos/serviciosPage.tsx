import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  LISTAR_GASTO_SERVICIO,
  CREAR_GASTO_SERVICIO,
} from '../../api/queries/paymentQueries';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { CrearGastoServicioDTO, GastoServicio } from '../../types/types';
import dayjs from 'dayjs';

interface Props {
  casaId: string;
}

type Order = 'asc' | 'desc';

const ServiciosContratados: React.FC<Props> = ({ casaId }) => {
  const [descripcion, setDescripcion] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [fechaRenovacion, setFechaRenovacion] = useState('');
  const [orderBy, setOrderBy] = useState<'fechaRegistro' | 'fechaRenovacion'>('fechaRegistro');
  const [order, setOrder] = useState<Order>('asc');

  const { data, loading, refetch } = useQuery(LISTAR_GASTO_SERVICIO, {
    variables: { casaId },
  });

  const [crearGastoServicio] = useMutation(CREAR_GASTO_SERVICIO, {
    onCompleted: () => {
      refetch();
      setDescripcion('');
      setValorTotal('');
      setFechaRenovacion('');
      window.alert('Servicio creado exitosamente.');
    },
    onError: (error) => {
      console.error(error);
      window.alert('Error al crear el servicio.');
    }
  });

  const handleCrear = () => {
    if (!descripcion.trim() || !valorTotal.trim() || !fechaRenovacion.trim()) {
      window.alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const valor = parseFloat(valorTotal);
    if (isNaN(valor) || valor <= 0) {
      window.alert('El valor total debe ser un número válido mayor que 0.');
      return;
    }

    const input: CrearGastoServicioDTO = {
      casaId,
      descripcion,
      valorTotal: valor,
      fechaRenovacion: new Date(fechaRenovacion).toISOString(),
    };

    crearGastoServicio({ variables: { input } });
  };

  const handleSort = (property: 'fechaRegistro' | 'fechaRenovacion') => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...(data?.listarGastoServicio || [])].sort((a, b) => {
    const dateA = new Date(a[orderBy]);
    const dateB = new Date(b[orderBy]);
    return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  return (
    <Box>
      <Typography variant="h6" color="black">Agregar Servicio</Typography>
      <Grid container spacing={2} mt={1} mb={3}>
        <Grid>
          <TextField
            fullWidth
            variant="filled"
            label="Descripción"
            required
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            InputLabelProps={{ style: { color: 'black' } }}
            inputProps={{ style: { color: 'black' } }}
            sx={{ backgroundColor: '#e0e0e0', borderRadius: 1 }}
          />
        </Grid>
        <Grid>
          <TextField
            required
            fullWidth
            variant="filled"
            label="Valor Total"
            type="number"
            value={valorTotal}
            onChange={(e) => setValorTotal(e.target.value)}
            InputLabelProps={{ style: { color: 'black' } }}
            inputProps={{ style: { color: 'black' } }}
            sx={{ backgroundColor: '#e0e0e0', borderRadius: 1 }}
          />
        </Grid>
        <Grid>
          <TextField
            required
            fullWidth
            variant="filled"
            label="Fecha Renovación"
            type="date"
            InputLabelProps={{ shrink: true, style: { color: 'black' } }}
            inputProps={{ style: { color: 'black' } }}
            value={fechaRenovacion}
            onChange={(e) => setFechaRenovacion(e.target.value)}
            sx={{ backgroundColor: '#e0e0e0', borderRadius: 1 }}
          />
        </Grid>
        <Grid>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCrear}
            sx={{ height: '100%' }}
          >
            Crear
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" color="black">Servicios Contratados</Typography>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Descripción</strong></TableCell>
                <TableCell><strong>Valor Total</strong></TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'fechaRegistro'}
                    direction={orderBy === 'fechaRegistro' ? order : 'asc'}
                    onClick={() => handleSort('fechaRegistro')}
                  >
                    <strong>Fecha Registro</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'fechaRenovacion'}
                    direction={orderBy === 'fechaRenovacion' ? order : 'asc'}
                    onClick={() => handleSort('fechaRenovacion')}
                  >
                    <strong>Fecha Renovación</strong>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((gasto: GastoServicio, i: number) => (
                <TableRow key={i}>
                  <TableCell>{gasto.descripcion}</TableCell>
                  <TableCell>${gasto.valorTotal.toLocaleString()}</TableCell>
                  <TableCell>{dayjs(gasto.fechaRegistro).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{dayjs(gasto.fechaRenovacion).format('YYYY-MM-DD')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ServiciosContratados;
