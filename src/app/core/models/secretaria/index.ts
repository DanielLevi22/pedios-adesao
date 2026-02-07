import type { Equipe } from '../equipes';
import type { Secretario } from '../secretario';

export interface Secretaria {
  nome: string;
  cnpj: string;
  telefone: string;
  secretario: Secretario;
  equipe: Equipe;
}
