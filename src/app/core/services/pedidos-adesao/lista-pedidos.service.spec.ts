import { TestBed } from '@angular/core/testing';

import { ListaPedidosService } from './lista-pedidos.service';

describe('ListaPedidosService', () => {
  let service: ListaPedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
