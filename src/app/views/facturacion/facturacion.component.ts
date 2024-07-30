import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IRequestFactura } from 'src/app/Models/facturas.interface';
import { IFacturaProducto, Producto } from 'src/app/Models/productos.interface';
import { ClientesService } from 'src/app/Services/clientes.service';
import { FacturasService } from 'src/app/Services/facturas.service';
import { ProductosService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
  standalone: true,
  imports: [CommonModule, NzPageHeaderModule, NzTableModule,NzButtonModule,NzSelectModule,NzInputNumberModule,ReactiveFormsModule,FormsModule,RouterModule]
})
export class FacturacionComponent {
  form:FormGroup=new FormGroup({});
  productosFactura:IFacturaProducto[]=[];
  private _fb :FormBuilder= inject(FormBuilder);
  clientes$ = this._clientesService.GetAllClientes();
  productos:Producto[]=[];
constructor( private _clientesService:ClientesService,private _productosService:ProductosService,private _facturas:FacturasService) {
  this.initForm();
  this._productosService.GetAllProductos().subscribe((productos)=>{
    this.productos=productos;
  });
}
initForm(){
this.form=this._fb.group({
  idCliente:['',Validators.required],
  nroFactura:['',Validators.required],
});
}
nuevaFactura(){
  this.form.reset();
  this.productosFactura=[];
}
agregarFilaProducto(){
  const newProduct:IFacturaProducto={
    idProducto:0,
    cantidadDeProducto:0,
    precioUnitarioProducto:0,
    subtotalProducto:0,
    notas:''
  };
  this.productosFactura= [...this.productosFactura,newProduct];
}
addProductoToFactura(idProducto:number,index:number){
  const producto=this.productos.find(p=>p.id==idProducto);
  if (producto) {
    if (this.productosFactura.filter(p=>p.idProducto==producto.id).length==0) {
      this.productosFactura= this.productosFactura.map((p,i)=>{
        if (i==index) {
          return {
            idProducto:producto.id,
            cantidadDeProducto:1,
            precioUnitarioProducto:producto.precioUnitario,
            subtotalProducto:producto.precioUnitario,
            notas:'',
            img:producto.ext
          };
        }else{
          return p;
        }
      });

    }else{
      alert('El producto ya se encuentra en la factura');
      this.productosFactura= this.productosFactura.map((p,i)=>{
        if (i==index) {
          return {
            idProducto:0,
            cantidadDeProducto:0,
            precioUnitarioProducto:0,
            subtotalProducto:0,
            notas:''
          };
        }else{
          return p;
        }
      })
    }

  }
  console.log(this.productosFactura)

}
get detalleTotales(){
  return {
    subTotal:this.productosFactura.reduce((acc,p)=>acc+p.subtotalProducto,0),
    impuestos:this.productosFactura.reduce((acc,p)=>acc+p.subtotalProducto,0)*0.19,
    totalFactura:this.productosFactura.reduce((acc,p)=>acc+p.subtotalProducto,0)+this.productosFactura.reduce((acc,p)=>acc+p.subtotalProducto,0)*0.19
  };

}
calcularSubtotal(index:number){
  const producto=this.productosFactura[index];
  if (producto) {
    this.productosFactura= this.productosFactura.map((p,i)=>{
      if (i==index) {
        return {
          ...p,
          subtotalProducto:p.cantidadDeProducto*p.precioUnitarioProducto
        };
      }else{
        return p;
      }
    });
  }
}
guardarFactura(){
  const request:IRequestFactura={
    fechaEmisionFactura:new Date(),
    idCliente:this.form.get('idCliente')?.value,
    numeroFactura:this.form.get('nroFactura')?.value,
    numeroTotalArticulos:this.productosFactura.length,
    subTotalFacturas:this.detalleTotales.subTotal,
    totalImpuestos:this.detalleTotales.impuestos,
    totalFactura:this.detalleTotales.totalFactura,
    detalles:this.productosFactura
  };
  console.log(request);
  this._facturas.CreateFactura(request).subscribe((response)=>{
  if (response) {
    this.nuevaFactura();
    this.productosFactura=[];
  }

  } );

}
}
