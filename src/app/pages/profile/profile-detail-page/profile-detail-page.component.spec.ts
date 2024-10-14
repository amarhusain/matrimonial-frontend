import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailPageComponent } from './profile-detail-page.component';

describe('ProfileDetailPageComponent', () => {
  let component: ProfileDetailPageComponent;
  let fixture: ComponentFixture<ProfileDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
