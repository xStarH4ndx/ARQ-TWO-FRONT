import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Producto } from '../../types/types';

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

interface ProductoCardProps {
  producto: Producto;
  onSeleccionar: (producto: Producto) => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto, onSeleccionar }) => (
  <Card
    sx={{
      height: 170,
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: `8px solid ${getBorderColor(producto.categoria)}`,
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>{producto.nombre}</Typography>
      <Typography variant="body2" color="text.secondary">
        Categoría: {producto.categoria}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={1}>
        {producto.descripcion || 'Sin descripción'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant="text" color="primary" onClick={() => onSeleccionar(producto)}>
        Seleccionar
      </Button>
    </CardActions>
  </Card>
);

export default ProductoCard;
