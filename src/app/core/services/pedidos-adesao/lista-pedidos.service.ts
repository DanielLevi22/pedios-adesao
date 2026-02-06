import { Injectable, signal } from '@angular/core';
import type {
  Documento,
  DocumentoStatus,
  PedidoDetalhe,
  PedidoResumo,
  PedidoStatus,
} from '../../model/pedidos';

@Injectable({
  providedIn: 'root',
})
export class ListaPedidosService {
  private pedidosSignal = signal<PedidoResumo[]>([
    {
      id: '1',
      cnpj: '12.345.678/0001-90',
      razaoSocial: 'Prefeitura de São Paulo',
      municipioUf: 'São Paulo/SP',
      dataSolicitacao: '01/02/2026',
      status: 'Aceito',
    },
    {
      id: '2',
      cnpj: '98.765.432/0001-10',
      razaoSocial: 'Prefeitura de Curitiba',
      municipioUf: 'Curitiba/PR',
      dataSolicitacao: '28/01/2026',
      status: 'Em análise',
    },
    {
      id: '3',
      cnpj: '11.222.333/0001-55',
      razaoSocial: 'Prefeitura de Salvador',
      municipioUf: 'Salvador/BA',
      dataSolicitacao: '25/01/2026',
      status: 'Em Retificação',
    },
    {
      id: '4',
      cnpj: '22.333.444/0001-66',
      razaoSocial: 'Prefeitura de Belo Horizonte',
      municipioUf: 'Belo Horizonte/MG',
      dataSolicitacao: '20/01/2026',
      status: 'Pendente',
    },
    {
      id: '5',
      cnpj: '33.444.555/0001-77',
      razaoSocial: 'Prefeitura de Recife',
      municipioUf: 'Recife/PE',
      dataSolicitacao: '18/01/2026',
      status: 'Aceito',
    },
    {
      id: '6',
      cnpj: '44.555.666/0001-88',
      razaoSocial: 'Prefeitura de Manaus',
      municipioUf: 'Manaus/AM',
      dataSolicitacao: '15/01/2026',
      status: 'Em Retificação',
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

  getPedidos() {
    return this.pedidosSignal.asReadonly();
  }

  getDetalheById(id: string) {
    return this.pedidosDetalheSignal().find((p) => p.id === id) ?? null;
  }

  atualizarStatusDocumento(
    pedidoId: string,
    documentoId: string,
    novoStatus: DocumentoStatus,
    motivoRetificacao?: string,
  ): void {
    this.pedidosDetalheSignal.update((pedidosDetalhe) =>
      pedidosDetalhe.map((pedido) => {
        if (pedido.id !== pedidoId) return pedido;

        const documentosAtualizados: Documento[] = (
          pedido.documentos ?? []
        ).map((doc) => {
          if (doc.id !== documentoId) return doc;

          if (novoStatus === 'Aceito') {
            return {
              ...doc,
              status: 'Aceito',
              motivoRetificacao: undefined,
            };
          }

          if (novoStatus === 'Pendente') {
            return {
              ...doc,
              status: 'Pendente',
              motivoRetificacao: undefined,
            };
          }

          if (novoStatus === 'Em Retificação') {
            return {
              ...doc,
              status: 'Em Retificação',
              motivoRetificacao:
                motivoRetificacao?.trim() || doc.motivoRetificacao || '',
            };
          }

          return doc;
        });

        const novoStatusPedido: PedidoStatus = this.calcularStatusPedido(
          documentosAtualizados,
        );

        return {
          ...pedido,
          status: novoStatusPedido,
          documentos: documentosAtualizados,
        };
      }),
    );

    this.pedidosSignal.update((pedidosResumo) =>
      pedidosResumo.map((pedido) =>
        pedido.id === pedidoId
          ? {
              ...pedido,
              status:
                this.pedidosDetalheSignal().find((p) => p.id === pedidoId)
                  ?.status ?? pedido.status,
            }
          : pedido,
      ),
    );
  }

  private calcularStatusPedido(documentos: Documento[]): PedidoStatus {
    if (!documentos?.length) {
      return 'Pendente';
    }

    const temEmRetificacao = documentos.some(
      (doc) => doc.status === 'Em Retificação',
    );

    const todosAceitos = documentos.every((doc) => doc.status === 'Aceito');

    if (todosAceitos) {
      return 'Aceito';
    }

    if (temEmRetificacao) {
      return 'Em Retificação';
    }

    return 'Em análise';
  }
}
