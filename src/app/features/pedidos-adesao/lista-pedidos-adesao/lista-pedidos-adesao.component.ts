import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconEye } from 'angular-tabler-icons/icons';

import {
  AppSelectComponent,
  type SelectItem,
} from '../../../shared/componentes/app-select/app-select.component';
import { AppInputComponent } from '../../../shared/componentes/app-input/input.component';
import { AppButtonComponent } from '../../../shared/componentes/app-button/app-button.component';
import { AppHeaderComponent } from '../../../shared/componentes/app-header/app-header.component';
import { ListaPedidosService } from '../../../core/services/pedidos-adesao/lista-pedidos.service';
import { getBadgeClassByStatus } from '../../../shared/utils/status-ui.utils';
import type { PedidoResumo } from '../../../core/models/pedidos';

@Component({
  selector: 'app-lista-pedidos-adesao',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
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
  private fb = inject(FormBuilder);

  filterForm = this.fb.group({
    nome: [''],
    cnpj: [''],
    status: ['all'],
  });

  filterValues = toSignal(this.filterForm.valueChanges, {
    initialValue: { nome: '', cnpj: '', status: 'all' },
  });

  pedidosSignal = signal<PedidoResumo[]>([]);

  getBadgeClass = getBadgeClassByStatus;

  pedidosFiltrados = computed(() => {
    const pedidosAtuais = this.pedidosSignal();
    const filters = this.filterValues();

    if (!filters) return pedidosAtuais;

    const nomeTermo = this.normalizar(filters.nome || '');
    const cnpjTermo = (filters.cnpj || '').trim().replace(/\D/g, '');
    const statusSelecionado = filters.status || 'all';

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
    try {
      const pedidos = await this.service.getPedidos();
      this.pedidosSignal.set(pedidos);
    } catch (e) {
      console.warn('Service not found or error fetching', e);
    }
  }

  atualizarStatus(novoValor: string) {
    this.filterForm.get('status')?.setValue(novoValor);
  }

  private normalizar(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  limparFiltros() {
    this.filterForm.patchValue({
      nome: '',
      cnpj: '',
      status: 'all',
    });
  }
}
