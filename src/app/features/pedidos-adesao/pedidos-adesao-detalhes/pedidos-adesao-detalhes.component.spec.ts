import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAdesaoDetalhesComponent } from './pedidos-adesao-detalhes.component';

describe('PedidosAdesaoDetalhesComponent', () => {
  let component: PedidosAdesaoDetalhesComponent;
  let fixture: ComponentFixture<PedidosAdesaoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosAdesaoDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosAdesaoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
