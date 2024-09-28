import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRegisterWidgetComponent } from './search-register-widget.component';

describe('SearchRegisterWidgetComponent', () => {
  let component: SearchRegisterWidgetComponent;
  let fixture: ComponentFixture<SearchRegisterWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRegisterWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRegisterWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
