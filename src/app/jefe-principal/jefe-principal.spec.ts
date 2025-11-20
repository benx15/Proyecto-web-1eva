import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefePrincipal } from './jefe-principal';

describe('JefePrincipal', () => {
  let component: JefePrincipal;
  let fixture: ComponentFixture<JefePrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JefePrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JefePrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
