import { TestBed } from '@angular/core/testing';

import { ListaPedidosDetalhesService } from './lista-pedidos-detalhes.service';

describe('ListaPedidosDetalhesService', () => {
  let service: ListaPedidosDetalhesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPedidosDetalhesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
