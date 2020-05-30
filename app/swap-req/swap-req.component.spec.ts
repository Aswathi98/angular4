import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapReqComponent } from './swap-req.component';

describe('SwapReqComponent', () => {
  let component: SwapReqComponent;
  let fixture: ComponentFixture<SwapReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
