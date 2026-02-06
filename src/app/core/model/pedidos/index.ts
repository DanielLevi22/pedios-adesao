export type PedidoStatus =
  | 'Aceito'
  | 'Pendente'
  | 'Em Retificação'
  | 'Em análise';

export type DocumentoStatus = 'Aceito' | 'Pendente' | 'Em Retificação';

export interface PedidoResumo {
  id: string;
  cnpj: string;
  razaoSocial: string;
  municipioUf: string;
  dataSolicitacao: string;
  status: PedidoStatus;
}

export interface Usuario {
  nome: string;
  cpf: string;
  portaria: string;
  email: string;
  celular: string;
  inicioVigencia: string;
  cargo: string;
  vinculadoTodasUnidades: boolean;
}

export interface Secretario {
  nome: string;
  cpf: string;
  email: string;
  celular: string;
}

export interface Equipe {
  agenteContratacao: string;
  pregoeiro: string;
  apoio: string;
}

export interface Secretaria {
  nome: string;
  cnpj: string;
  telefone: string;
  secretario: Secretario;
  equipe: Equipe;
}

export interface Documento {
  id: string;
  nome: string;
  status: DocumentoStatus;
  motivoRetificacao?: string;
}

export interface OrgaoDetalhe {
  cnpj: string;
  razaoSocial: string;
  endereco: string;
  numero: string;
  bairro: string;
  municipio: string;
  estado: string;
  cep: string;
  complemento: string;
  ibge: string;
  site: string;
  telefone: string;
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
