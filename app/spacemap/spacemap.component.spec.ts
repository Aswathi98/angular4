import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as jsSeatMap from '../../assets/js/jquery.seat-charts.js';
import { SpacemapComponent } from './spacemap.component';

describe('DepartmentListComponent', () => {
  let component: SpacemapComponent;
  let fixture: ComponentFixture<SpacemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
