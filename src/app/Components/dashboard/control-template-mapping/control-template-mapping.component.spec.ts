import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTemplateMappingComponent } from './control-template-mapping.component';

describe('ControlTemplateMappingComponent', () => {
  let component: ControlTemplateMappingComponent;
  let fixture: ComponentFixture<ControlTemplateMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlTemplateMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTemplateMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
