import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementsDetailsComponent } from './placements-details.component';

describe('PlacementsDetailsComponent', () => {
  let component: PlacementsDetailsComponent;
  let fixture: ComponentFixture<PlacementsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
