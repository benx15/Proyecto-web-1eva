import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorPrincipal } from './trabajador-principal';

describe('TrabajadorPrincipal', () => {
  let component: TrabajadorPrincipal;
  let fixture: ComponentFixture<TrabajadorPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabajadorPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajadorPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
