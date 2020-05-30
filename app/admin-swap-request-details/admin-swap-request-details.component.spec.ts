import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSwapRequestDetailsComponent } from './admin-swap-request-details.component';

describe('AdminSwapRequestDetailsComponent', () => {
  let component: AdminSwapRequestDetailsComponent;
  let fixture: ComponentFixture<AdminSwapRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSwapRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSwapRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
