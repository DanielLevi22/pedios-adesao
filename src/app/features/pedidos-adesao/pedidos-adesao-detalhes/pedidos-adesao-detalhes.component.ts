import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconUsers,
  IconBuilding,
  IconBriefcase2,
  IconFileText,
} from 'angular-tabler-icons/icons';
import { ListaPedidosService } from '../../../core/services/pedidos-adesao/lista-pedidos.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type {
  Documento,
  DocumentoStatus,
  PedidoDetalhe,
} from '../../../core/model/pedidos';
import { AppButtonComponent } from '../../../shared/componentes/app-button/app-button.component';
import { AppHeaderComponent } from '../../../shared/componentes/app-header/app-header.component';
import { ToastrService } from 'ngx-toastr';
import { getBadgeClassByStatus } from '../../../shared/utils/status-ui.utils';

@Component({
  selector: 'app-pedidos-adesao-detalhes',
  standalone: true,
  imports: [
    TablerIconComponent,
    NgClass,
    FormsModule,
    AppButtonComponent,
    AppHeaderComponent,
  ],
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
export class PedidosAdesaoDetalhesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ListaPedidosService);
  private toastr = inject(ToastrService);
  pedidoOriginal = signal<PedidoDetalhe | null>(null);
  pedidoRascunho = signal<PedidoDetalhe | null>(null);
  getBadgeClass = getBadgeClassByStatus;

  rascunhoAlteracoes = signal<
    Map<string, { status: DocumentoStatus; motivoRetificacao?: string }>
  >(new Map());

  pedido = computed(() => this.pedidoRascunho() ?? this.pedidoOriginal());

  ngOnInit() {
    this.carregarPedido();
  }

  private carregarPedido() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const pedido = this.service.getDetalheById(id);
    if (pedido) {
      const copia = structuredClone(pedido);
      this.pedidoOriginal.set(copia);
      this.pedidoRascunho.set(copia);
    } else {
      this.pedidoOriginal.set(null);
      this.pedidoRascunho.set(null);
    }

    this.rascunhoAlteracoes.set(new Map());
  }
  aceitar(doc: Documento) {
    if (!doc.id) return;

    const novoStatus: Documento['status'] =
      doc.status === 'Aceito' ? 'Pendente' : 'Aceito';

    this.atualizarRascunho(doc.id, {
      status: novoStatus,
      motivoRetificacao: undefined,
    });

    this.rascunhoAlteracoes.update((map) => {
      const novoMap = new Map(map);
      novoMap.set(doc.id, { status: novoStatus });
      return novoMap;
    });
  }

  retificar(doc: Documento) {
    if (!doc.id) return;

    const novoStatus: Documento['status'] =
      doc.status === 'Em Retificação' ? 'Pendente' : 'Em Retificação';

    const motivo = novoStatus === 'Em Retificação' ? '' : undefined;

    this.atualizarRascunho(doc.id, {
      status: novoStatus,
      motivoRetificacao: motivo,
    });

    this.rascunhoAlteracoes.update((map) => {
      const novoMap = new Map(map);
      if (novoStatus === 'Em Retificação') {
        novoMap.set(doc.id, { status: novoStatus, motivoRetificacao: '' });
      } else {
        novoMap.set(doc.id, { status: novoStatus });
      }
      return novoMap;
    });
  }

  private atualizarRascunho(docId: string, changes: Partial<Documento>) {
    this.pedidoRascunho.update((rascunhoAtual) => {
      if (!rascunhoAtual) return null;

      const novosDocumentos = rascunhoAtual.documentos.map((doc) => {
        if (doc.id === docId) {
          const novoDoc = { ...doc, ...changes };
          if (novoDoc.status !== 'Em Retificação') {
            delete novoDoc.motivoRetificacao;
          }
          return novoDoc;
        }
        return { ...doc };
      });

      return { ...rascunhoAtual, documentos: novosDocumentos };
    });
  }

  atualizarMotivoRetificacao(docId: string, motivo: string) {
    this.atualizarRascunho(docId, {
      motivoRetificacao: motivo,
    });

    this.rascunhoAlteracoes.update((map) => {
      const novoMap = new Map(map);
      const alteracaoAtual = novoMap.get(docId);

      if (alteracaoAtual) {
        novoMap.set(docId, {
          ...alteracaoAtual,
          motivoRetificacao: motivo,
        });
      } else {
        novoMap.set(docId, {
          status: 'Em Retificação',
          motivoRetificacao: motivo,
        });
      }

      return novoMap;
    });
  }

  salvarAlteracoes() {
    const pedidoRascunhoAtual = this.pedidoRascunho();
    if (!pedidoRascunhoAtual || !pedidoRascunhoAtual.id) return;

    const pedidoId = pedidoRascunhoAtual.id;
    const alteracoes = this.rascunhoAlteracoes();

    if (alteracoes.size === 0) {
      this.toastr.success('Salvo com sucesso!');
      return;
    }

    for (const [docId, alteracao] of alteracoes) {
      if (
        alteracao.status === 'Em Retificação' &&
        !alteracao.motivoRetificacao?.trim()
      ) {
        const doc = pedidoRascunhoAtual.documentos.find((d) => d.id === docId);
        this.toastr.error(
          `O documento "${doc?.nome}" precisa de um motivo para retificação!`,
        );
        return;
      }
    }

    for (const [docId, alteracao] of alteracoes) {
      this.service.atualizarStatusDocumento(
        pedidoId,
        docId,
        alteracao.status,
        alteracao.motivoRetificacao?.trim(),
      );
    }

    this.rascunhoAlteracoes.set(new Map());

    const atualizado = this.service.getDetalheById(pedidoId);
    if (atualizado) {
      const copia = structuredClone(atualizado);
      this.pedidoOriginal.set(copia);
      this.pedidoRascunho.set(copia);
    }

    this.toastr.success('Salvo com sucesso!');
  }
}
