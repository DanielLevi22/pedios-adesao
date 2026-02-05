import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconUsers,
  IconBuilding,
  IconBriefcase2,
  IconFileText,
} from 'angular-tabler-icons/icons'; // importe só os que usar!
import { ListaPedidosService } from '../../../core/services/pedidos-adesao/lista-pedidos.service';
import { NgClass } from '@angular/common';
import type { PedidoDetalhe } from '../../../core/model/pedidos';

@Component({
  selector: 'app-pedidos-adesao-detalhes',
  imports: [TablerIconComponent, NgClass],
  providers: [
    provideTablerIcons({
      IconUsers,
      IconBuilding,
      IconBriefcase2,
      IconFileText,
    }),
  ],
  templateUrl: './pedidos-adesao-detalhes.component.html',
  styleUrl: './pedidos-adesao-detalhes.component.scss',
})
export class PedidosAdesaoDetalhesComponent {
  private route = inject(ActivatedRoute);
  private service = inject(ListaPedidosService);
  pedidoDetalhes = signal<PedidoDetalhe | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pedidoDetalhes.set(this.service.getDetalheById(id));
    }
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Aprovado':
        return 'bg-success text-white';
      case 'Pendente':
        return 'bg-warning text-dark';
      case 'Rejeitado':
        return 'bg-danger text-white';
      case 'Em análise':
        return 'bg-info text-white';
      default:
        return 'bg-secondary text-white';
    }
  }
}
