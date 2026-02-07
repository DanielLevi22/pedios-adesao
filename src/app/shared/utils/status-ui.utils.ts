import type { PedidoStatus } from '../../core/models/pedidos';

export function getBadgeClassByStatus(status: PedidoStatus): string {
  switch (status) {
    case 'Aceito':
      return 'bg-success text-white';
    case 'Pendente':
      return 'bg-blue-badge text-white';
    case 'Em análise':
      return 'bg-warning text-white';
    case 'Em Retificação':
      return 'bg-danger text-white';
    default:
      return 'bg-secondary text-white';
  }
}
