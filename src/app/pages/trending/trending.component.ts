import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  brand: string;
  image: string;
  price: number;
  rank?: number; // Optional rank property
}

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent {
  genders = [
    { name: 'Now Trending', types: ['Now Trending'] },
    { name: 'Women', types: ['Dress', 'Jacket', 'Jeans', 'Swimsuits'] },
    { name: 'Men', types: ['Jacket', 'Pants', 'Swimsuits'] }
  ];

  selectedGender: string = 'Now Trending'; // Default to Now Trending
  selectedCategory: string | null = null;
  trendingItems: Product[] = [];

  allTrendingItems: { [key: string]: Product[] } = {
    'Women-Dress': [
      { name: 'The Elegant Dress0', brand: 'Brand A', image: 'assets/images/women-Dress.jpg', price: 150 },
      { name: 'The Elegant Dress1', brand: 'Brand B', image: 'assets/images/Dress1.jpg', price: 200 },
      { name: 'The Elegant Dress2', brand: 'Brand C', image: 'assets/images/Dress2.jpg', price: 250 },
      { name: 'The Elegant Dress3', brand: 'Brand D', image: 'assets/images/Dress3.jpg', price: 350 }
    ],
    'Women-Jacket': [
      { name: 'Winter Coat0', brand: 'Brand C', image: 'assets/images/Women-Jacket.jpg', price: 300 },
      { name: 'Winter Coat1', brand: 'Brand D', image: 'assets/images/Jacket1.jpg', price: 250 },
      { name: 'Winter Coat2', brand: 'Brand E', image: 'assets/images/Jacket2.jpg', price: 450 },
      { name: 'Winter Coat3', brand: 'Brand F', image: 'assets/images/Jacket3.jpg', price: 280 }
    ],
    'Women-Jeans': [
      { name: 'Jeans1', brand: 'Brand G', image: 'assets/images/women-jeans.jpg', price: 100 },
      { name: 'Jeans2', brand: 'Brand H', image: 'assets/images/Jeans1.jpg', price: 120 },
      { name: 'Jeans3', brand: 'Brand I', image: 'assets/images/Jeans2.jpg', price: 180 },
      { name: 'Jeans4', brand: 'Brand J', image: 'assets/images/Jeans3.jpg', price: 220 }
    ],
    'Women-Swimsuits': [
      { name: 'Swimsuit1', brand: 'Brand K', image: 'assets/images/Women-Swimmingsuits.jpg', price: 75 },
      { name: 'Swimsuit2', brand: 'Brand L', image: 'assets/images/sw1.jpg', price: 80 },
      { name: 'Swimsuit3', brand: 'Brand L', image: 'assets/images/sw2.jpg', price: 70 },
      { name: 'Swimsuit4', brand: 'Brand K', image: 'assets/images/sw3.jpg', price: 90 }
    ],
    'Men-Jacket': [
      { name: 'Jacket0', brand: 'Brand I', image: 'assets/images/men-jacket.jpg', price: 180 },
      { name: 'Jacket1', brand: 'Brand J', image: 'assets/images/jm1.jpg', price: 170 },
      { name: 'Jacket2', brand: 'Brand M', image: 'assets/images/jm2.jpg', price: 210 },
      { name: 'Jacket3', brand: 'Brand K', image: 'assets/images/jm3.jpg', price: 240 }
    ],
    'Men-Pants': [
      { name: 'Pants0', brand: 'Brand K', image: 'assets/images/men-pants.jpg', price: 90 },
      { name: 'Pants1', brand: 'Brand L', image: 'assets/images/pants1.jpg', price: 170 },
      { name: 'Pants2', brand: 'Brand I', image: 'assets/images/pants2.jpg', price: 200 },
      { name: 'Pants3', brand: 'Brand L', image: 'assets/images/pants3.jpg', price: 150 }
    ],
    'Men-Swimsuits': [
      { name: 'Shorts0', brand: 'Brand M', image: 'assets/images/men-swimmingsuits.jpg', price: 100 },
      { name: 'Shorts1', brand: 'Brand A', image: 'assets/images/sw4.jpg', price: 95 },
      { name: 'Shorts2', brand: 'Brand C', image: 'assets/images/sw5.jpg', price: 75 },
      { name: 'Shorts3', brand: 'Brand N', image: 'assets/images/sw6.jpg', price: 150 }
    ]
  };

  // Collect all items once to set as default trending items
  defaultTrendingItems: Product[] = [];

  constructor() {
    this.setDefaultTrendingItems();
  }

  setDefaultTrendingItems() {
    const allProducts: Product[] = [];

    // Gather all items from allTrendingItems
    for (let category in this.allTrendingItems) {
      allProducts.push(...this.allTrendingItems[category]);
    }

    // Shuffle and assign ranks
    this.defaultTrendingItems = this.shuffleArray(allProducts).map((item, index) => ({
      ...item,
      rank: index + 1 // Set rank based on the shuffled index
    }));

    // Set trendingItems with ranked items
    this.trendingItems = this.defaultTrendingItems;
  }

  // Helper function to shuffle array
  shuffleArray(array: Product[]): Product[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
    this.selectedCategory = null;
    this.trendingItems = this.defaultTrendingItems; // Reset to default items when a new gender is selected
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    const key = `${this.selectedGender}-${category}`;
    this.trendingItems = this.allTrendingItems[key].map((item, index) => ({
      ...item,
      rank: index + 1
    })) || []; // Update trendingItems with ranks based on selected category
  }
}
