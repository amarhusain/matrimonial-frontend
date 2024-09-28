import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FeatureSectionComponent } from '../feature-section/feature-section.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { ProfileShowcaseComponent } from '../profile-showcase/profile-showcase.component';
import { SearchRegisterWidgetComponent } from '../search-register-widget/search-register-widget.component';
import { SuccessStorySectionComponent } from '../success-story-section/success-story-section.component';
import { TestimonialSectionComponent } from '../testimonial-section/testimonial-section.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    SearchRegisterWidgetComponent,
    HowItWorksComponent,
    FeatureSectionComponent,
    SuccessStorySectionComponent,
    ProfileShowcaseComponent,
    TestimonialSectionComponent

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
