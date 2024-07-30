import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppService } from '../api/app-service.service';
import { RequestStructure, TypeRequest } from '../api/models/request-api.model';
import { IRequestFactura, IResponseFactura } from '../Models/facturas.interface';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private _appService = inject(AppService);

  constructor() { }

  CreateFactura(factura:IRequestFactura): Observable<boolean> {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.POST,
        body: factura
      },

      endpoint: 'api/Facturas/CreateFactura',
    };
    return this._appService.sentRequest$(request).pipe(
      map((response:any)=>{
        if (response.isOk) {
          return response.result as boolean;
        }else{
          return false;
        }
      })
    );
  }
  GetFactura(idCliente:number,numeroFactura:number): Observable<IResponseFactura[]> {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.GET
      },

      endpoint: `api/Facturas/GetFactura?idCliente=${idCliente}&numeroFactura=${numeroFactura}`,
    };
    return this._appService.sentRequest$(request).pipe(
      map((response:any)=>{
        if (response.isOk) {
          return response.result as IResponseFactura[];
        }else{
          return [];
        }
      })
    );
  }
}
