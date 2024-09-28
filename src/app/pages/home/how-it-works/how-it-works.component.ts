import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComments, faSearch, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';


interface Step {
  icon: any;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {

  faUserPlus = faUserPlus;
  faUserEdit = faUserEdit;
  faSearch = faSearch;
  faComments = faComments;

  steps: Step[] = [
    {
      icon: this.faUserPlus,
      title: 'Register for Free',
      description: 'Sign up by providing some basic details about yourself.'
    },
    {
      icon: this.faUserEdit,
      title: 'Create Your Profile',
      description: 'Build a detailed profile and upload your best photo.'
    },
    {
      icon: this.faSearch,
      title: 'Browse Matches',
      description: 'Explore recommended matches or use filters to search.'
    },
    {
      icon: this.faComments,
      title: 'Connect and Chat',
      description: 'Reach out to your potential matches and start a conversation.'
    }
  ];
}
