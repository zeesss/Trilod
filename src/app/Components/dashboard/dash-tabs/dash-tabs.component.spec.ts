import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTabsComponent } from './dash-tabs.component';

describe('DashTabsComponent', () => {
  let component: DashTabsComponent;
  let fixture: ComponentFixture<DashTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
