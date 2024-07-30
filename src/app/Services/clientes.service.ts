import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppService } from '../api/app-service.service';
import { RequestStructure, TypeRequest } from '../api/models/request-api.model';
import { ICliente } from '../Models/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
private _appService = inject(AppService);
GetAllClientes(): Observable<ICliente[]> {
  const request: RequestStructure = {
    request: {
      type: TypeRequest.GET
    },

    endpoint: 'api/Clientes/GetAllClientes',
  };
  return this._appService.sentRequest$(request).pipe(
    map((response:any)=>{
      if (response.isOk) {
        return response.result as ICliente[];
      }else{
        return [];
      }
    })
  );
}
}
