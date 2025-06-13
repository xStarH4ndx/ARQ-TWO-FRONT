import { gql } from "@apollo/client";

export const LISTAR_GASTO_SERVICIO = gql`
  query ListarGastoServicio($casaId: String!) {
    listarGastoServicio(casaId: $casaId) {
      casaId
      descripcion
      valorTotal
      fechaRenovacion
    }
  }
`;

export const LISTAR_GASTO_COMPRA = gql`
  query ListarGastoCompra($casaId: String!) {
    listarGastoCompra(casaId: $casaId) {
      id
      compraId
      itemsCompra {
        productoId
        nombreProducto
        cantidad
        precioUnitario
        esCompartido
        propietarioId
      }
      valorTotalCompartido
      valorTotalIndividual
    }
  }
`;

export const CREAR_GASTO_SERVICIO = gql`
  mutation CrearGastoServicio($input: CrearGastoServicioDTO!) {
    crearGastoServicio(input: $input)
  }
`;