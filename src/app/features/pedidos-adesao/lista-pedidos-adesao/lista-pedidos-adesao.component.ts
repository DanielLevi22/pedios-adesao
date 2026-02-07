import { Component, computed, inject, signal } from '@angular/core';
import {
  AppSelectComponent,
  type SelectItem,
} from '../../../shared/componentes/app-select/app-select.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListaPedidosService } from '../../../core/services/pedidos-adesao/lista-pedidos.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppInputComponent } from '../../../shared/componentes/app-input/input.component';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconEye } from 'angular-tabler-icons/icons';
import { AppButtonComponent } from '../../../shared/componentes/app-button/app-button.component';
import { AppHeaderComponent } from '../../../shared/componentes/app-header/app-header.component';
import { getBadgeClassByStatus } from '../../../shared/utils/status-ui.utils';
import type { PedidoResumo } from '../../../core/models/pedidos';

@Component({
  selector: 'app-lista-pedidos-adesao',
  imports: [
    NgSelectModule,
    FormsModule,
    AppSelectComponent,
    NgClass,
    RouterLink,
    AppInputComponent,
    TablerIconComponent,
    AppButtonComponent,
    AppHeaderComponent,
  ],
  providers: [
    provideTablerIcons({
      IconEye,
    }),
  ],
  templateUrl: './lista-pedidos-adesao.component.html',
  styleUrl: './lista-pedidos-adesao.component.scss',
})
export class ListaPedidosAdesaoComponent {
  private service = inject(ListaPedidosService);

  pedidosSignal = signal<PedidoResumo[]>([]);

  filtroNome = signal<string>('');
  filtroCnpj = signal<string>('');
  filtroStatus = signal<string>('all');

  getBadgeClass = getBadgeClassByStatus;

  pedidosFiltrados = computed(() => {
    const pedidosAtuais = this.pedidosSignal();
    const nomeTermo = this.normalizar(this.filtroNome());
    const cnpjTermo = this.filtroCnpj().trim().replace(/\D/g, '');
    const statusSelecionado = this.filtroStatus();

    if (!nomeTermo && !cnpjTermo && statusSelecionado === 'all') {
      return pedidosAtuais;
    }

    return pedidosAtuais.filter((p) => {
      const matchNome =
        !nomeTermo ||
        this.normalizar(p.razaoSocial || '').includes(nomeTermo) ||
        this.normalizar(p.cnpj || '').includes(nomeTermo);

      const matchCnpj =
        !cnpjTermo || (p.cnpj || '').replace(/\D/g, '').includes(cnpjTermo);

      const matchStatus =
        statusSelecionado === 'all' ||
        p.status?.toLowerCase() === statusSelecionado.toLowerCase();

      return matchNome && matchCnpj && matchStatus;
    });
  });

  statusItems: SelectItem[] = [
    { id: 'all', name: 'Todos os status' },
    { id: 'Pendente', name: 'Pendente' },
    { id: 'Em análise', name: 'Em análise' },
    { id: 'Aceito', name: 'Aceito' },
    { id: 'Em Retificação', name: 'Em Retificação' },
  ];

  constructor() {
    this.carregarPedidos();
  }

  private async carregarPedidos() {
    const pedidos = await this.service.getPedidos();
    this.pedidosSignal.set(pedidos);
  }

  atualizarStatus(novoValor: string) {
    this.filtroStatus.set(novoValor);
  }

  private normalizar(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  limparFiltros() {
    this.filtroNome.set('');
    this.filtroCnpj.set('');
    this.filtroStatus.set('all');
  }
}
