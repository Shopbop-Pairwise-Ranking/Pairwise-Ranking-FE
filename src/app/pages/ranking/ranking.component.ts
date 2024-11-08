import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'] // Note: Changed 'styleUrl' to 'styleUrls' (it's an array)
})
export class RankingComponent {
  gender: string;
  category: string;
  items: any[] = []; // Array of clothing items for the selected category
  currentPair: any[] | null = null;
  currentIndex = 0;

  constructor(private route: ActivatedRoute) {
    // Retrieve gender and category from the route parameters
    this.gender = this.route.snapshot.paramMap.get('gender')!;
    this.category = this.route.snapshot.paramMap.get('category')!;
    // Fetch items based on gender and category
    this.loadItems();
  }

  loadItems() {
    // Load items for the category (mock or fetch from API)
    this.items = [
      { imageUrl: 'assets/images/item1.jpg', id: 1, name: 'Item 1' },
      { imageUrl: 'assets/images/item2.jpg', id: 2, name: 'Item 2' },
      // Add more items as needed...
    ];
    this.showNextPair();
  }

  showNextPair() {
    // Show the next pair of items
    if (this.currentIndex < this.items.length - 1) {
      this.currentPair = [this.items[this.currentIndex], this.items[this.currentIndex + 1]];
      this.currentIndex += 2;
    } else {
      this.currentPair = null; // No more pairs left
    }
  }

  selectItem(index: number) {
    // Handle item selection logic
    console.log(`Selected item: ${this.currentPair?.[index].name}`);
    this.showNextPair();
  }

  skip() {
    // Skip to the next pair
    this.showNextPair();
  }
}
