import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppService } from '../api/app-service.service';
import { RequestStructure, TypeRequest } from '../api/models/request-api.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private _appService = inject(AppService);

  GetAllProductos(): Observable<any[]> {
    const request: RequestStructure = {
      request: {
        type: TypeRequest.GET
      },

      endpoint: 'api/Productos/GetAllProductos',
    };
    return this._appService.sentRequest$(request).pipe(
      map((response:any)=>{
        if (response.isOk) {
          return response.result as any[];
        }else{
          return [];
        }
      })
    );
  }
}
