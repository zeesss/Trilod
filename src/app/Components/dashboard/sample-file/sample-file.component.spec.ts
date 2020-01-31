import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleFileComponent } from './sample-file.component';

describe('SampleFileComponent', () => {
  let component: SampleFileComponent;
  let fixture: ComponentFixture<SampleFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
