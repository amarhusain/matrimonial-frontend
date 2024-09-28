import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface UserProfile {
  id: number;
  name: string;
  age: number;
  profession: string;
  location: string;
  imageUrl: string;
}


@Component({
  selector: 'app-profile-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-showcase.component.html',
  styleUrl: './profile-showcase.component.scss'
})
export class ProfileShowcaseComponent {

  featuredProfiles: UserProfile[] = [
    {
      id: 1,
      name: 'Sarah',
      age: 28,
      profession: 'Software Engineer',
      location: 'New York, NY',
      imageUrl: '/images/profile-sarah.jpg'
    },
    {
      id: 2,
      name: 'Michael',
      age: 32,
      profession: 'Marketing Manager',
      location: 'Los Angeles, CA',
      imageUrl: '/images/profile-michael.jpg'
    },
    {
      id: 3,
      name: 'Emily',
      age: 26,
      profession: 'Graphic Designer',
      location: 'Chicago, IL',
      imageUrl: '/images/profile-emily.jpg'
    },
    {
      id: 4,
      name: 'David',
      age: 30,
      profession: 'Financial Analyst',
      location: 'Houston, TX',
      imageUrl: '/images/profile-david.jpg'
    }
    // Add more profiles as needed
  ];



}
