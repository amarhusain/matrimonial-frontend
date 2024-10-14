import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProfilePageComponent } from './search-profile-page.component';

describe('SearchProfilePageComponent', () => {
  let component: SearchProfilePageComponent;
  let fixture: ComponentFixture<SearchProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProfilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
