import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatClienteComponent } from './cat-cliente.component';

describe('CatClienteComponent', () => {
  let component: CatClienteComponent;
  let fixture: ComponentFixture<CatClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
