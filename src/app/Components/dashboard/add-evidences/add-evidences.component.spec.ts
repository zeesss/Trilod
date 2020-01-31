import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvidencesComponent } from './add-evidences.component';

describe('AddEvidencesComponent', () => {
  let component: AddEvidencesComponent;
  let fixture: ComponentFixture<AddEvidencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEvidencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
