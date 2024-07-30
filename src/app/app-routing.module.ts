import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./views/facturacion/facturacion.component').then(m => m.FacturacionComponent)
  },
  {
    path:'busqueda',
    loadComponent: () => import('./views/buscar-factura/buscar-factura.component').then(m => m.BuscarFacturaComponent)
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
