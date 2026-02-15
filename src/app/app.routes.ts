import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/pedidos-adesao/pedidos-adesao.routes').then(
        (m) => m.PEDIDOS_ADESAO_ROUTES,
      ),
  },
  {
    path: 'assinaturas',
    loadChildren: () =>
      import('./features/assinaturas/assinaturas.routes').then(
        (m) => m.ASSINATURA_ROUTES,
      ),
  },
  {
    path: 'pesquisa-precos',
    loadChildren: () =>
      import('./features/pesquisa-precos/pesquisa-precos.routes').then(
        (m) => m.PESQUISA_PRECOS_ROUTES,
      ),
  },
];
