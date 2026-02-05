import { Routes } from '@angular/router';
import { ListaPedidosAdesaoComponent } from './lista-pedidos-adesao/lista-pedidos-adesao.component';
import { PedidosAdesaoDetalhesComponent } from './pedidos-adesao-detalhes/pedidos-adesao-detalhes.component';

export const PEDIDOS_ADESAO_ROUTES: Routes = [
  {
    path: '',
    component: ListaPedidosAdesaoComponent,
  },
  {
    path: 'detalhes/:id',
    component: PedidosAdesaoDetalhesComponent,
  },
];
