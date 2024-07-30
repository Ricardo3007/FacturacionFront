import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IResponseFactura } from 'src/app/Models/facturas.interface';
import { ClientesService } from 'src/app/Services/clientes.service';
import { FacturasService } from 'src/app/Services/facturas.service';

@Component({
  selector: 'app-buscar-factura',
  templateUrl: './buscar-factura.component.html',
  styleUrls: ['./buscar-factura.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,NzPageHeaderModule,NzButtonModule,NzIconModule,NzRadioModule,NzSelectModule,NzInputNumberModule,NzTableModule]
})
export class BuscarFacturaComponent {
  private _fb: FormBuilder = inject(FormBuilder);
  form:FormGroup=new FormGroup({});
  facturas:IResponseFactura[]=[];
  clientes$ = this._clientesService.GetAllClientes();
  loading:boolean=false;
  constructor( private _clientesService:ClientesService,private _facturas:FacturasService ) {
    this.initForm();
  }
  initForm(){
    this.form=this._fb.group({
      tipoBusqueda:[0,Validators.required],
      nroFactura:[0],
      idCliente:[0]
    });
  }
  buscarFactura(){
    this.loading=true;
    const request={
      idCliente: this.form.value.tipoBusqueda == 0 ?this.form.value.idCliente:0,
      nroFactura: this.form.value.tipoBusqueda == 1 ?this.form.value.nroFactura:0
    };

    this._facturas.GetFactura(request.idCliente,request.nroFactura).subscribe((facturas)=>{
      this.loading=false;
        this.facturas=facturas;
    }
    );
  }
}
