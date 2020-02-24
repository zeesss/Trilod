import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProcessEditComponent } from './sub-process-edit.component';

describe('SubProcessEditComponent', () => {
  let component: SubProcessEditComponent;
  let fixture: ComponentFixture<SubProcessEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProcessEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProcessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
