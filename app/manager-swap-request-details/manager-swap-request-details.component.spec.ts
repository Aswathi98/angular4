import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSwapRequestDetailsComponent } from './manager-swap-request-details.component';

describe('ManagerSwapRequestDetailsComponent', () => {
  let component: ManagerSwapRequestDetailsComponent;
  let fixture: ComponentFixture<ManagerSwapRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSwapRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSwapRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
