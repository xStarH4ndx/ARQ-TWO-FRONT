// ------------------- PRODUCTOS
export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  descripcion?: string | null;
}

export interface CrearProductoInputDto {
  nombre: string;
  categoria: string;
  descripcion?: string;
}

// ------------------- ITEM COMPRA
export interface ItemCompra {
  productoId: string;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  esCompartido: boolean;
  propietarioId?: string | null;
}

export interface ItemCompraInput {
  productoId: string;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  esCompartido: boolean;
  propietarioId?: string;
}

// ------------------- COMPRAS
export interface Compra {
  id: string;
  casaId: string;
  fechaCompra: string; // DateTime (ISO string)
  itemsCompra: ItemCompra[];
}

export interface CompraCreacionInput {
  casaId: string;
  items: ItemCompraInput[];
}

// ------------------- INVENTARIO
export interface Inventario {
  id: string;
  casaId: string;
  productoId: string;
  nombreProducto: string;
  cantidadStock: number;
}

// ------------------- GASTO SERVICIO
export interface GastoServicio {
  casaId: string;
  descripcion: string;
  valorTotal: number;
  fechaRegistro: string;
  fechaRenovacion: string; // ISO 8601
}

export interface CrearGastoServicioDTO {
  casaId: string;
  descripcion: string;
  valorTotal: number;
  fechaRenovacion: string; // ISO 8601
}

// ------------------- GASTO COMPRA
export interface GastoCompra {
  id: string;
  compraId: string;
  descripcion: string;
  fechaRegistro: string;
  itemsCompra: ItemCompra[];
  valorTotalCompartido: number;
  valorTotalIndividual: number;
}
