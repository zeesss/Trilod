import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAuditComponent } from './session-audit.component';

describe('SessionAuditComponent', () => {
  let component: SessionAuditComponent;
  let fixture: ComponentFixture<SessionAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
