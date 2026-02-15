import { Injectable, signal } from '@angular/core';
import type {
  PedidoDetalhe,
  PedidoResumo,
  PedidoStatus,
} from '../../models/pedidos';
import type { Documento, DocumentoStatus } from '../../models/documentos';
import type { AssinaturaResumo } from '../../models/assinatura';

@Injectable({
  providedIn: 'root',
})
export class AssinaturaOrgaosService {
  private assinatura = signal<AssinaturaResumo[]>([
    {
      id: '1',
      cnpj: '12.345.678/0001-90',
      razaoSocial: 'Prefeitura de São Paulo',
      plano: 'São Paulo/SP',
      vencimento: '01/02/2026',
      status: 'Ativa',
    },
    {
      id: '2',
      cnpj: '98.765.432/0001-10',
      razaoSocial: 'Prefeitura do Rio de Janeiro',
      plano: 'Rio de Janeiro/RJ',
      vencimento: '15/11/2025',
      status: 'Ativa',
    },
    {
      id: '3',
      cnpj: '45.123.987/0001-55',
      razaoSocial: 'Prefeitura de Belo Horizonte',
      plano: 'Belo Horizonte/MG',
      vencimento: '30/09/2024',
      status: 'Vencida',
    },
    {
      id: '4',
      cnpj: '67.890.123/0001-22',
      razaoSocial: 'Prefeitura de Curitiba',
      plano: 'Curitiba/PR',
      vencimento: '10/06/2026',
      status: 'Ativa',
    },
    {
      id: '5',
      cnpj: '11.222.333/0001-44',
      razaoSocial: 'Prefeitura de Salvador',
      plano: 'Salvador/BA',
      vencimento: '05/01/2025',
      status: 'Cancelada',
    },
  ]);

  private pedidosDetalheSignal = signal<PedidoDetalhe[]>([
    {
      id: '1',
      status: 'Aceito',
      dataSolicitacao: '01/02/2026',
      orgao: {
        cnpj: '12.345.678/0001-90',
        razaoSocial: 'Prefeitura de São Paulo',
        endereco: 'Praça da Sé',
        numero: '1',
        bairro: 'Sé',
        municipio: 'São Paulo',
        estado: 'SP',
        cep: '01001-000',
        complemento: 'Centro',
        ibge: '3550308',
        site: 'www.prefeitura.sp.gov.br',
        telefone: '(11) 99999-9999',
      },
      usuarios: [
        {
          nome: 'João Silva Santos',
          cpf: '123.456.789-00',
          portaria: '001/2024',
          email: 'joao.silva@orgao.gov.br',
          celular: '(11) 99999-1234',
          inicioVigencia: '31/12/2023',
          cargo: 'Pregoeiro',
          vinculadoTodasUnidades: true,
        },
        {
          nome: 'Maria Oliveira Costa',
          cpf: '987.654.321-00',
          portaria: '002/2024',
          email: 'maria.oliveira@orgao.gov.br',
          celular: '(11) 98888-5678',
          inicioVigencia: '15/01/2024',
          cargo: 'Agente de Contratação',
          vinculadoTodasUnidades: false,
        },
      ],
      secretarias: [
        {
          nome: 'Secretaria de Educação',
          cnpj: '12.345.678/0003-52',
          telefone: '(11) 3333-2222',
          secretario: {
            nome: 'Dra. Beatriz Monteiro',
            cpf: '555.666.777-88',
            email: 'beatriz.monteiro@orgao.gov.br',
            celular: '(11) 99888-5678',
          },
          equipe: {
            agenteContratacao: 'Dra. Beatriz Monteiro',
            pregoeiro: 'Fernanda Alves',
            apoio: 'Marcos Silva, Julia Costa',
          },
        },
      ],
      documentos: [
        { id: 'doc-1-1', nome: 'Termo de adesão assinado', status: 'Aceito' },
        { id: 'doc-1-2', nome: 'Comprovante de CNPJ', status: 'Aceito' },
        {
          id: 'doc-1-3',
          nome: 'Certidão negativa de débitos',
          status: 'Aceito',
        },
      ],
    },
    {
      id: '2',
      status: 'Em análise',
      dataSolicitacao: '28/01/2026',
      orgao: {
        cnpj: '98.765.432/0001-10',
        razaoSocial: 'Prefeitura de Curitiba',
        endereco: 'Rua XV de Novembro',
        numero: '100',
        bairro: 'Centro',
        municipio: 'Curitiba',
        estado: 'PR',
        cep: '80000-000',
        complemento: 'Sala 12',
        ibge: '4106902',
        site: 'www.curitiba.pr.gov.br',
        telefone: '(41) 99999-8888',
      },
      usuarios: [
        {
          nome: 'Pedro Almeida',
          cpf: '222.333.444-55',
          portaria: '010/2025',
          email: 'pedro.almeida@orgao.gov.br',
          celular: '(41) 97777-6666',
          inicioVigencia: '10/01/2025',
          cargo: 'Agente de Contratação',
          vinculadoTodasUnidades: true,
        },
      ],
      secretarias: [],
      documentos: [
        { id: 'doc-2-1', nome: 'Termo de adesão assinado', status: 'Aceito' },
        { id: 'doc-2-2', nome: 'Comprovante de CNPJ', status: 'Aceito' },
        {
          id: 'doc-2-3',
          nome: 'Certidão negativa de débitos',
          status: 'Pendente',
        },
      ],
    },
    {
      id: '3',
      status: 'Em Retificação',
      dataSolicitacao: '25/01/2026',
      orgao: {
        cnpj: '11.222.333/0001-55',
        razaoSocial: 'Prefeitura de Salvador',
        endereco: 'Praça Municipal',
        numero: '50',
        bairro: 'Centro Histórico',
        municipio: 'Salvador',
        estado: 'BA',
        cep: '40020-000',
        complemento: 'Paço Municipal',
        ibge: '2927408',
        site: 'www.salvador.ba.gov.br',
        telefone: '(71) 99999-0000',
      },
      usuarios: [
        {
          nome: 'Carlos Nogueira',
          cpf: '333.444.555-66',
          portaria: '005/2025',
          email: 'carlos.nogueira@orgao.gov.br',
          celular: '(71) 98888-1111',
          inicioVigencia: '05/01/2025',
          cargo: 'Pregoeiro',
          vinculadoTodasUnidades: false,
        },
      ],
      secretarias: [],
      documentos: [
        { id: 'doc-3-1', nome: 'Termo de adesão assinado', status: 'Aceito' },
        {
          id: 'doc-3-2',
          nome: 'Comprovante de CNPJ',
          status: 'Em Retificação',
          motivoRetificacao: 'Falta assinatura digital',
        },
        {
          id: 'doc-3-3',
          nome: 'Certidão negativa de débitos',
          status: 'Aceito',
        },
      ],
    },
    {
      id: '4',
      status: 'Pendente',
      dataSolicitacao: '20/01/2026',
      orgao: {
        cnpj: '22.333.444/0001-66',
        razaoSocial: 'Prefeitura de Belo Horizonte',
        endereco: 'Av. Afonso Pena',
        numero: '1200',
        bairro: 'Centro',
        municipio: 'Belo Horizonte',
        estado: 'MG',
        cep: '30130-003',
        complemento: 'Andar 3',
        ibge: '3106200',
        site: 'www.pbh.gov.br',
        telefone: '(31) 98888-7777',
      },
      usuarios: [],
      secretarias: [],
      documentos: [
        { id: 'doc-4-1', nome: 'Termo de adesão assinado', status: 'Pendente' },
        { id: 'doc-4-2', nome: 'Comprovante de CNPJ', status: 'Pendente' },
      ],
    },
    {
      id: '5',
      status: 'Aceito',
      dataSolicitacao: '18/01/2026',
      orgao: {
        cnpj: '33.444.555/0001-77',
        razaoSocial: 'Prefeitura de Recife',
        endereco: 'Av. Cais do Apolo',
        numero: '925',
        bairro: 'Recife Antigo',
        municipio: 'Recife',
        estado: 'PE',
        cep: '50030-230',
        complemento: 'Sala 10',
        ibge: '2611606',
        site: 'www.recife.pe.gov.br',
        telefone: '(81) 97777-6666',
      },
      usuarios: [],
      secretarias: [],
      documentos: [
        { id: 'doc-6-1', nome: 'Termo de adesão assinado', status: 'Aceito' },
      ],
    },
    {
      id: '6',
      status: 'Em Retificação',
      dataSolicitacao: '15/01/2026',
      orgao: {
        cnpj: '44.555.666/0001-88',
        razaoSocial: 'Prefeitura de Manaus',
        endereco: 'Av. Brasil',
        numero: '2971',
        bairro: 'Compensa',
        municipio: 'Manaus',
        estado: 'AM',
        cep: '69036-110',
        complemento: 'Prédio administrativo',
        ibge: '1302603',
        site: 'www.manaus.am.gov.br',
        telefone: '(92) 96666-5555',
      },
      usuarios: [],
      secretarias: [],
      documentos: [
        {
          id: 'doc-6-1',
          nome: 'Termo de adesão assinado',
          status: 'Em Retificação',
          motivoRetificacao: 'Registro de motivo de retificação',
        },
        { id: 'doc-6-2', nome: 'Comprovante de CNPJ', status: 'Pendente' },
      ],
    },
  ]);

  constructor() {}

  async getPedidos(): Promise<AssinaturaResumo[]> {
    await this.delay(1500 + Math.random() * 1500);

    return this.assinatura();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  getDetalheById(id: string) {
    return this.pedidosDetalheSignal().find((p) => p.id === id) ?? null;
  }

  // atualizarStatusDocumento(
  //   pedidoId: string,
  //   documentoId: string,
  //   novoStatus: DocumentoStatus,
  //   motivoRetificacao?: string,
  // ): void {
  //   this.pedidosDetalheSignal.update((pedidosDetalhe) =>
  //     pedidosDetalhe.map((pedido) => {
  //       if (pedido.id !== pedidoId) return pedido;

  //       const documentosAtualizados: Documento[] = (
  //         pedido.documentos ?? []
  //       ).map((doc) => {
  //         if (doc.id !== documentoId) return doc;

  //         if (novoStatus === 'Aceito') {
  //           return {
  //             ...doc,
  //             status: 'Aceito',
  //             motivoRetificacao: undefined,
  //           };
  //         }

  //         if (novoStatus === 'Pendente') {
  //           return {
  //             ...doc,
  //             status: 'Pendente',
  //             motivoRetificacao: undefined,
  //           };
  //         }

  //         if (novoStatus === 'Em Retificação') {
  //           return {
  //             ...doc,
  //             status: 'Em Retificação',
  //             motivoRetificacao:
  //               motivoRetificacao?.trim() || doc.motivoRetificacao || '',
  //           };
  //         }

  //         return doc;
  //       });

  //       const novoStatusPedido: PedidoStatus = this.calcularStatusPedido(
  //         documentosAtualizados,
  //       );

  //       return {
  //         ...pedido,
  //         status: novoStatusPedido,
  //         documentos: documentosAtualizados,
  //       };
  //     }),
  //   );

  //   this.pedidosSignal.update((pedidosResumo) =>
  //     pedidosResumo.map((pedido) =>
  //       pedido.id === pedidoId
  //         ? {
  //             ...pedido,
  //             status:
  //               this.pedidosDetalheSignal().find((p) => p.id === pedidoId)
  //                 ?.status ?? pedido.status,
  //           }
  //         : pedido,
  //     ),
  //   );
  // }

  // private calcularStatusPedido(documentos: Documento[]): PedidoStatus {
  //   if (!documentos?.length) {
  //     return 'Pendente';
  //   }

  //   const todosAceitos = documentos.every((doc) => doc.status === 'Aceito');
  //   if (todosAceitos) {
  //     return 'Aceito';
  //   }

  //   const todosPendentes = documentos.every((doc) => doc.status === 'Pendente');
  //   if (todosPendentes) {
  //     return 'Pendente';
  //   }

  //   const temEmRetificacao = documentos.some(
  //     (doc) => doc.status === 'Em Retificação',
  //   );
  //   const temPendente = documentos.some((doc) => doc.status === 'Pendente');

  //   if (temEmRetificacao && !temPendente) {
  //     return 'Em Retificação';
  //   }

  //   return 'Em análise';
  // }
}
