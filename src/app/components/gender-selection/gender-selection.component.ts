import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender-selection',
  templateUrl: './gender-selection.component.html',
  styleUrls: ['./gender-selection.component.scss'],
  standalone: true,
  imports: []
})
export class GenderSelectionComponent {

  constructor(private router: Router) {}

  selectGender(gender: string) {
    // Navigate to the category selection page with the selected gender
    this.router.navigate(['/categories', gender]);
  }
}
