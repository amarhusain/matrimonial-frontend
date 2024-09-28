import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


interface Testimonial {
  id: number;
  name: string;
  age: number;
  location: string;
  quote: string;
  rating: number;
  imageUrl: string;
}

@Component({
  selector: 'app-testimonial-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-section.component.html',
  styleUrl: './testimonial-section.component.scss'
})
export class TestimonialSectionComponent {

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Emily',
      age: 29,
      location: 'New York, NY',
      quote: "I found my life partner on Eternal Hearts and couldn't be happier.The journey was smooth and enjoyable!",
      rating: 5,
      imageUrl: '/images/testimonial-emily.jpg'
    },
    {
      id: 2,
      name: 'Michael',
      age: 34,
      location: 'Los Angeles, CA',
      quote: 'Eternal Hearts made it easy to connect with like-minded individuals. I met my wife here within months!',
      rating: 5,
      imageUrl: '/images/testimonial-michael.jpg'
    },
    {
      id: 3,
      name: 'Sophia',
      age: 27,
      location: 'Chicago, IL',
      quote: 'The personalized matches were spot-on. I appreciated the focus on compatibility beyond just appearances.',
      rating: 4,
      imageUrl: '/images/testimonial-sophia.jpg'
    }
    // Add more testimonials as needed
  ];

}
