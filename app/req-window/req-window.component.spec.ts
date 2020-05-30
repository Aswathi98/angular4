import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqWindowComponent } from './req-window.component';

describe('ReqWindowComponent', () => {
  let component: ReqWindowComponent;
  let fixture: ComponentFixture<ReqWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
