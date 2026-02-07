import type { Documento } from '../documentos';
import type { OrgaoDetalhe } from '../orgaos';
import type { Secretaria } from '../secretaria';
import type { Usuario } from '../usuario';

export type PedidoStatus =
  | 'Aceito'
  | 'Pendente'
  | 'Em Retificação'
  | 'Em análise';

export interface PedidoResumo {
  id: string;
  cnpj: string;
  razaoSocial: string;
  municipioUf: string;
  dataSolicitacao: string;
  status: PedidoStatus;
}

export interface PedidoDetalhe {
  id: string;
  status: PedidoStatus;
  dataSolicitacao: string;
  orgao: OrgaoDetalhe;
  usuarios: Usuario[];
  secretarias: Secretaria[];
  documentos: Documento[];
}
