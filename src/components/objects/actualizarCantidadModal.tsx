import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { ACTUALIZAR_INVENTARIO } from '../../api/queries/inventoryQueries';
import { Inventario } from '../../types/types';

interface ActualizarCantidadModalProps {
  abierto: boolean;
  onCerrar: () => void;
  producto: Inventario | null;
  onActualizado: () => void;
}

const ActualizarCantidadModal: React.FC<ActualizarCantidadModalProps> = ({
  abierto,
  onCerrar,
  producto,
  onActualizado,
}) => {
  const [cantidad, setCantidad] = useState<number>(0);

  useEffect(() => {
    if (producto) {
      setCantidad(producto.cantidadStock);
    }
  }, [producto]);

  const [actualizarInventario, { loading }] = useMutation(ACTUALIZAR_INVENTARIO, {
    onCompleted: () => {
      onActualizado();
      onCerrar();
    },
    onError: (err) => {
      alert('Error actualizando inventario: ' + err.message);
    },
  });

  const handleActualizar = () => {
    if (producto) {
      actualizarInventario({
        variables: {
          id: producto.id,
          cantidad
        },
      });
    }
  };

  return (
    <Dialog open={abierto} onClose={onCerrar}>
      <DialogTitle>Actualizar cantidad de stock</DialogTitle>
      <DialogContent>
        <TextField
          type="number"
          label="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          fullWidth
          inputProps={{ min: 0 }}
          autoFocus
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCerrar} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleActualizar}
          variant="contained"
          disabled={loading || cantidad < 0}
        >
          {loading ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActualizarCantidadModal;
