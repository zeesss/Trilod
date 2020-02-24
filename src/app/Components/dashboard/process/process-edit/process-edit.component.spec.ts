import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEditComponent } from './process-edit.component';

describe('ProcessEditComponent', () => {
  let component: ProcessEditComponent;
  let fixture: ComponentFixture<ProcessEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
