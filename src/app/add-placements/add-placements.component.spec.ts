import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlacementsComponent } from './add-placements.component';

describe('AddPlacementsComponent', () => {
  let component: AddPlacementsComponent;
  let fixture: ComponentFixture<AddPlacementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlacementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
