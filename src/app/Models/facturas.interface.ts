import { IFacturaProducto } from "./productos.interface";

export interface IRequestFactura {
  fechaEmisionFactura:  Date;
  idCliente:            number;
  numeroFactura:        number;
  numeroTotalArticulos: number;
  subTotalFacturas:     number;
  totalImpuestos:       number;
  totalFactura:         number;
  detalles:             IFacturaProducto[];
}
export interface IResponseFactura extends IRequestFactura {
  id : number;
}