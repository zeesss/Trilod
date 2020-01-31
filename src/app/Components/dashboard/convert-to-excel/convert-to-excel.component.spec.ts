import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToExcelComponent } from './convert-to-excel.component';

describe('ConvertToExcelComponent', () => {
  let component: ConvertToExcelComponent;
  let fixture: ComponentFixture<ConvertToExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertToExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertToExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
