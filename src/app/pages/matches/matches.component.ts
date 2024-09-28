import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent implements OnInit {
  matches = [
    { name: 'John Doe', age: 25, religion: 'Christian', gender: 'Male' },
    { name: 'Jane Smith', age: 28, religion: 'Hindu', gender: 'Female' },
    // Add more profiles as needed
  ];

  ngOnInit(): void { }
}
