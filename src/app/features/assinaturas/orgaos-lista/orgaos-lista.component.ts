import { Component, computed, inject, signal } from '@angular/core';
import type { SelectItem } from '../../../shared/componentes/app-select/app-select.component';
import { FormBuilder } from '@angular/forms';
import { AssinaturaOrgaosService } from '../../../core/services/assinatura-orgaos/assinatura-orgaos.service';
import { toSignal } from '@angular/core/rxjs-interop';
import type { AssinaturaResumo } from '../../../core/models/assinatura';
import { getBadgeClassByStatus } from '../../../shared/utils/status-ui.utils';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-orgaos-lista',
  imports: [RouterLink, TablerIconComponent],
  templateUrl: './orgaos-lista.component.html',
  styleUrl: './orgaos-lista.component.scss',
})
export class OrgaosListaComponent {
  private service = inject(AssinaturaOrgaosService);
  private fb = inject(FormBuilder);

  filterForm = this.fb.group({
    nome: [''],
    cnpj: [''],
    status: ['all'],
  });

  filterValues = toSignal(this.filterForm.valueChanges, {
    initialValue: { nome: '', cnpj: '', status: 'all' },
  });

  pedidosSignal = signal<AssinaturaResumo[]>([]);

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
