import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTaskComponent } from './control-task.component';

describe('ControlTaskComponent', () => {
  let component: ControlTaskComponent;
  let fixture: ComponentFixture<ControlTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
