import { gql } from '@apollo/client';

// ---------------------------- PRODUCTOS
export const CREAR_PRODUCTO = gql`
  mutation CrearProducto($input: CrearProductoInputDto!) {
    crearProducto(input: $input)
  }
`;

export const ELIMINAR_PRODUCTO = gql`
  mutation EliminarProducto($id: String!) {
    eliminarProducto(id: $id)
  }
`;

export const LISTAR_PRODUCTOS = gql`
  query {
    listarProductos {
      id
      nombre
      categoria
      descripcion
    }
  }
`;

export const OBTENER_PRODUCTO = gql`
  query ObtenerProducto($id: String!) {
    obtenerProducto(id: $id) {
      id
      nombre
      categoria
      descripcion
    }
  }
`;

// ---------------------------- COMPRAS
export const CREAR_COMPRA = gql`
  mutation CrearCompra($compra: CompraCreacionInput!) {
    crearCompra(compra: $compra)
  }
`;

export const ELIMINAR_COMPRA = gql`
  mutation EliminarCompra($id: String!) {
    eliminarCompra(id: $id)
  }
`;

export const LISTAR_COMPRAS = gql`
  query ListarCompras($casaId: String!) {
    listarCompras(casaId: $casaId) {
      id
      casaId
      fechaCompra
      itemsCompra {
        productoId
        nombreProducto
        cantidad
        precioUnitario
        esCompartido
        propietarioId
      }
    }
  }
`;

// ---------------------------- INVENTARIO
export const ACTUALIZAR_INVENTARIO = gql`
  mutation ActualizarInventario($id: String!, $cantidad: Float!) {
    actualizarInventario(id: $id, cantidad: $cantidad) {
      id
      casaId
      productoId
      nombreProducto
      cantidadStock
    }
  }
`;

export const LISTAR_INVENTARIO = gql`
  query ListarInventario($casaId: String!) {
    listarInventario(casaId: $casaId) {
      id
      casaId
      productoId
      nombreProducto
      cantidadStock
    }
  }
`;

