import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProfileResultComponent } from './search-profile-result.component';

describe('SearchProfileResultComponent', () => {
  let component: SearchProfileResultComponent;
  let fixture: ComponentFixture<SearchProfileResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProfileResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProfileResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
