import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as jsSeatMap from '../../assets/js/jquery.seat-charts.js';
import { SpacemapComponent1 } from './spacemap.component';

describe('DepartmentListComponent', () => {
  let component: SpacemapComponent1;
  let fixture: ComponentFixture<SpacemapComponent1>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacemapComponent1 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacemapComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
