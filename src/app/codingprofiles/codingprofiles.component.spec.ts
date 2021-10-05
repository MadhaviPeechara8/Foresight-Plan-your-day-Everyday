import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingprofilesComponent } from './codingprofiles.component';

describe('CodingprofilesComponent', () => {
  let component: CodingprofilesComponent;
  let fixture: ComponentFixture<CodingprofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodingprofilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
