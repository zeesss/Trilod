import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPaperComponent } from './work-paper.component';

describe('WorkPaperComponent', () => {
  let component: WorkPaperComponent;
  let fixture: ComponentFixture<WorkPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
