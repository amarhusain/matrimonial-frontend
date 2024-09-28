import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStorySectionComponent } from './success-story-section.component';

describe('SuccessStorySectionComponent', () => {
  let component: SuccessStorySectionComponent;
  let fixture: ComponentFixture<SuccessStorySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessStorySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessStorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
