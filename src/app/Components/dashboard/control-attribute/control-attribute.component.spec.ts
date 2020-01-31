import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAttributeComponent } from './control-attribute.component';

describe('ControlAttributeComponent', () => {
  let component: ControlAttributeComponent;
  let fixture: ComponentFixture<ControlAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
