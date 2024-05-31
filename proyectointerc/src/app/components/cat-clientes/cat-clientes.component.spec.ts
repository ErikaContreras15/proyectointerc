import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatClientesComponent } from './cat-clientes.component';

describe('CatClientesComponent', () => {
  let component: CatClientesComponent;
  let fixture: ComponentFixture<CatClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
