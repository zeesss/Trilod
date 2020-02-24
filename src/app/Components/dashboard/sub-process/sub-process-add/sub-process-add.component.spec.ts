import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubProcessAddComponent } from './sub-process-add.component';

describe('SubProcessAddComponent', () => {
  let component: SubProcessAddComponent;
  let fixture: ComponentFixture<SubProcessAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubProcessAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubProcessAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
