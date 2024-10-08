import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileSearchDto } from '../../models/profile.model';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent implements OnInit {
  matches = [
    { name: 'John Doe', age: 25, religion: 'Christian', gender: 'Male' },
    { name: 'Jane Smith', age: 28, religion: 'Hindu', gender: 'Female' },
    // Add more profiles as needed
  ];

  searchForm: FormGroup;
  profiles: ProfileSearchDto[] = [];  // This will store the matched profiles


  constructor(
    private fb: FormBuilder,
    private matchService: MatchService) {
    // Define the form group
    this.searchForm = this.fb.group({
      gender: [''],
      ageRange: [''],
      city: ['']
    });
  }

  ngOnInit(): void { }

  onSearch(): void {
    const searchCriteria = this.searchForm.value;

    // Fetch matching profiles based on search criteria
    this.matchService.searchProfiles(searchCriteria).subscribe({
      next: (profiles: any[]) => {
        this.profiles = profiles;
      },
      error: (err: any) => {
        console.error('Error fetching profiles:', err);
      }
    });
  }
}
