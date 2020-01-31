import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskControlMatrixComponent } from './risk-control-matrix.component';

describe('RiskControlMatrixComponent', () => {
  let component: RiskControlMatrixComponent;
  let fixture: ComponentFixture<RiskControlMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskControlMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskControlMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
