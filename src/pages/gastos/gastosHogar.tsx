import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LISTAR_GASTO_COMPRA } from '../../api/queries/paymentQueries';
import {
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material';
import dayjs from 'dayjs';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GastoCompra } from '../../types/types';

interface Props {
  casaId: string;
}

const GastosDelHogar: React.FC<Props> = ({ casaId }) => {
  const { loading, error, data } = useQuery(LISTAR_GASTO_COMPRA, {
    variables: { casaId },
  });

  const [selectedMonth, setSelectedMonth] = useState<string>(dayjs().format('YYYY-MM'));

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const gastos = data.listarGastoCompra.filter(
    (gasto: GastoCompra) => gasto.valorTotalCompartido > 0
  );

  const gastosFiltrados = gastos.filter((gasto: GastoCompra) => {
    const fecha = dayjs(gasto.fechaRegistro);
    const [year, month] = selectedMonth.split('-');
    return (
      fecha.year() === parseInt(year) &&
      fecha.month() === parseInt(month) - 1
    );
  });

  const total = gastosFiltrados.reduce(
    (acc: number, gasto: GastoCompra) => acc + gasto.valorTotalCompartido,
    0
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Cartola de Gastos del Hogar', 14, 15);
    doc.setFontSize(12);
    doc.text(`Mes: ${dayjs(selectedMonth).format('MMMM YYYY')}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Descripción', 'Fecha', 'Valor Compartido']],
      body: [
        ...gastosFiltrados.map((gasto: GastoCompra) => [
          gasto.descripcion || 'Sin descripción',
          dayjs(gasto.fechaRegistro).format('DD/MM/YYYY'),
          `$${gasto.valorTotalCompartido.toLocaleString()}`,
        ]),
        [
          { content: 'Total', colSpan: 2, styles: { fontStyle: 'bold' } },
          `$${total.toLocaleString()}`
        ]
      ],
    });

    doc.save(`cartola_gastos_${selectedMonth}.pdf`);
  };

  return (
    <Box>
      <Box display="flex" flexWrap="wrap" alignItems="center" gap={2} mb={3}>
        <Typography variant="h6" color="black">
          Gastos del Hogar
        </Typography>
        <TextField
          type="month"
          variant='filled'
          label="Mes"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          InputLabelProps={{ shrink: true, style: { color: 'black' } }}
          inputProps={{ style: { color: 'black' } }}
          sx={{ minWidth: 150, backgroundColor: '#e0e0e0', borderRadius: 1 }}
        />
        <Button variant="contained" color="info" onClick={handleDownloadPDF}>
          Descargar PDF
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Valor Compartido</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gastosFiltrados.map((gasto: GastoCompra) => (
              <TableRow key={gasto.id}>
                <TableCell>{gasto.descripcion || 'Sin descripción'}</TableCell>
                <TableCell>{dayjs(gasto.fechaRegistro).format('DD/MM/YYYY')}</TableCell>
                <TableCell>${gasto.valorTotalCompartido.toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}><strong>Total</strong></TableCell>
              <TableCell><strong>${total.toLocaleString()}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GastosDelHogar;
