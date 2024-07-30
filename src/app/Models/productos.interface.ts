export interface Producto{
  id:number;
  nombreProducto:string;
  imagenProducto:string;
  ext:string
  precioUnitario:number;
}
export interface IFacturaProducto{
 idProducto:number;
 cantidadDeProducto:number;
 precioUnitarioProducto:number;
 subtotalProducto:number;
 notas:string;
}