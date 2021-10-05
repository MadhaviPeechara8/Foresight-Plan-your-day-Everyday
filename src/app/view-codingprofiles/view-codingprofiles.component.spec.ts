import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCodingprofilesComponent } from './view-codingprofiles.component';

describe('ViewCodingprofilesComponent', () => {
  let component: ViewCodingprofilesComponent;
  let fixture: ComponentFixture<ViewCodingprofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCodingprofilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCodingprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
