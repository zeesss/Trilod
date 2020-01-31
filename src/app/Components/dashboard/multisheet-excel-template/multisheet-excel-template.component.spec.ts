import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultisheetExcelTemplateComponent } from './multisheet-excel-template.component';

describe('MultisheetExcelTemplateComponent', () => {
  let component: MultisheetExcelTemplateComponent;
  let fixture: ComponentFixture<MultisheetExcelTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultisheetExcelTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultisheetExcelTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
