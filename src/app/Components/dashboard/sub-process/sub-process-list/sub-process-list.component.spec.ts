import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProcessListComponent } from './sub-process-list.component';

describe('SubProcessListComponent', () => {
  let component: SubProcessListComponent;
  let fixture: ComponentFixture<SubProcessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProcessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
