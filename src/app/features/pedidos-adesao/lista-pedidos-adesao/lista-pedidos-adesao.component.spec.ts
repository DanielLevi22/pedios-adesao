import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPedidosAdesaoComponent } from './lista-pedidos-adesao.component';

describe('ListaPedidosAdesaoComponent', () => {
  let component: ListaPedidosAdesaoComponent;
  let fixture: ComponentFixture<ListaPedidosAdesaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPedidosAdesaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPedidosAdesaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
