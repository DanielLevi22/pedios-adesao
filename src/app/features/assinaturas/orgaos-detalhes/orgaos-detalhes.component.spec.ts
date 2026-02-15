import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaosDetalhesComponent } from './orgaos-detalhes.component';

describe('OrgaosDetalhesComponent', () => {
  let component: OrgaosDetalhesComponent;
  let fixture: ComponentFixture<OrgaosDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgaosDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgaosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
