import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlacementsComponent } from './view-placements.component';

describe('ViewPlacementsComponent', () => {
  let component: ViewPlacementsComponent;
  let fixture: ComponentFixture<ViewPlacementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlacementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
