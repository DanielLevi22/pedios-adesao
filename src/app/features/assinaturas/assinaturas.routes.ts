import type { Routes } from '@angular/router';
import { OrgaosDetalhesComponent } from './orgaos-detalhes/orgaos-detalhes.component';
import { OrgaosListaComponent } from './orgaos-lista/orgaos-lista.component';

export const ASSINATURA_ROUTES: Routes = [
  {
    path: '',
    component: OrgaosListaComponent,
  },
  {
    path: 'detalhes/:id',
    component: OrgaosDetalhesComponent,
  },
];
