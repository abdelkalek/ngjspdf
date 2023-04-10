import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureFrv2Component } from './facture-frv2.component';

describe('FactureFrv2Component', () => {
  let component: FactureFrv2Component;
  let fixture: ComponentFixture<FactureFrv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureFrv2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureFrv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
