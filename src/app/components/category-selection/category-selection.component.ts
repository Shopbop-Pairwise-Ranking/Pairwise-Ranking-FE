import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss']
})
export class CategorySelectionComponent {
  gender: string;
  categories: { name: string; imageUrl: string }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.gender = this.route.snapshot.paramMap.get('gender')!;
    this.loadCategories();
  }

  loadCategories() {
    if (this.gender === 'women') {
      this.categories = [
        { name: 'Dress', imageUrl: 'assets/images/women-Dress.jpg' },
        { name: 'Jacket', imageUrl: 'assets/images/Women-Jacket.jpg' },
        { name: 'Jeans', imageUrl: 'assets/images/women-jeans.jpg' },
        { name: 'Swimmingsuits', imageUrl: 'assets/images/Women-Swimmingsuits.jpg' }
      ];
    } else if (this.gender === 'men') {
      this.categories = [
        { name: 'Jacket', imageUrl: 'assets/images/men-jacket.jpg' },
        { name: 'Pants', imageUrl: 'assets/images/men-pants.jpg' },
        { name: 'Swimmingsuits', imageUrl: 'assets/images/men-swimmingsuits.jpg' }
      ];
    }
  }

  selectCategory(category: string) {
    this.router.navigate(['/ranking', this.gender, category.toLowerCase()]);
  }
}
