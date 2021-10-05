import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodingprofilesComponent } from './add-codingprofiles.component';

describe('AddCodingprofilesComponent', () => {
  let component: AddCodingprofilesComponent;
  let fixture: ComponentFixture<AddCodingprofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCodingprofilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCodingprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
