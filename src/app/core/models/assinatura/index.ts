export type AssinaturaStatus = 'Ativa' | 'Vencida' | 'Cancelada';

export interface AssinaturaResumo {
  id: string;
  cnpj: string;
  razaoSocial: string;
  plano: string;
  vencimento: string;
  status: AssinaturaStatus;
}
