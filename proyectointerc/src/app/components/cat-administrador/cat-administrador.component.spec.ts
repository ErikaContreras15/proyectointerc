import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatAdministradorComponent } from './cat-administrador.component';

describe('CatAdministradorComponent', () => {
  let component: CatAdministradorComponent;
  let fixture: ComponentFixture<CatAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
