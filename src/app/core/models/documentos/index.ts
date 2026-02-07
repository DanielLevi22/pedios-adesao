export type DocumentoStatus = 'Aceito' | 'Pendente' | 'Em Retificação';

export interface Documento {
  id: string;
  nome: string;
  status: DocumentoStatus;
  motivoRetificacao?: string;
}
