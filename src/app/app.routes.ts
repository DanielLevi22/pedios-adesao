import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/pedidos-adesao/pedidos-adesao.routes').then(
        (m) => m.PEDIDOS_ADESAO_ROUTES,
      ),
  },
];
