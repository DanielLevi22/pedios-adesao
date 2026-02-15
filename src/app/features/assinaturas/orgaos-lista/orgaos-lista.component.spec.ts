import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaosListaComponent } from './orgaos-lista.component';

describe('OrgaosListaComponent', () => {
  let component: OrgaosListaComponent;
  let fixture: ComponentFixture<OrgaosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgaosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgaosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
