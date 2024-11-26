import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  productSin: string;
  productCode: string;
  shortDescription: string;
  designerName: string;
  images: Array<{ src: string }>;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-clothing-ranking',
  templateUrl: './clothing-ranking.component.html',
  styleUrls: ['./clothing-ranking.component.scss'],
})
export class ClothingRankingComponent implements OnInit {
  products: Product[] = []; // List of fetched products
  currentPair: Product[] = []; // Current pair of products being compared
  comparisonsLeft: number = 10; // Number of comparisons left
  index: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeProducts();
  }

  initializeProducts(): void {
    this.products = [
      {
        productSin: '1',
        productCode: 'CODE1',
        shortDescription: 'Elegant Dress',
        designerName: 'Designer 1',
        images: [{ src: 'assets/images/product1.jpg' }],
      },
      {
        productSin: '2',
        productCode: 'CODE2',
        shortDescription: 'Stylish Jacket',
        designerName: 'Designer 2',
        images: [{ src: 'assets/images/product2.jpg' }],
      },
      {
        productSin: '3',
        productCode: 'CODE3',
        shortDescription: 'Chic Top',
        designerName: 'Designer 3',
        images: [{ src: 'assets/images/Dress1.jpg' }],
      },
      {
        productSin: '4',
        productCode: 'CODE4',
        shortDescription: 'Casual Pants',
        designerName: 'Designer 4',
        images: [{ src: 'assets/images/Dress2.jpg' }],
      },
      {
        productSin: '5',
        productCode: 'CODE5',
        shortDescription: 'Trendy Skirt',
        designerName: 'Designer 5',
        images: [{ src: 'assets/images/Dress3.jpg' }],
      },
    ];

    this.setupComparison();
  }

  setupComparison(): void {
    this.products = this.shuffle(this.products); // Shuffle products
    this.loadNextPair();
  }

  loadNextPair(): void {
    if (this.comparisonsLeft > 0) {
      // If the index exceeds the available product pairs, reshuffle the products
      if (this.index >= this.products.length - 1) {
        this.index = 0; // Reset index
        this.products = this.shuffle(this.products); // Reshuffle products
      }

      // Load the next pair of products
      this.currentPair = [this.products[this.index], this.products[this.index + 1]];
      this.index += 2; // Increment index by 2
    } else {
      this.completeRanking(); // Complete the ranking process
    }
  }

  shuffle(array: Product[]): Product[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectOption(selectedProduct: Product): void {
    this.comparisonsLeft--; // Decrement comparisons left
    this.loadNextPair(); // Load the next pair
  }

  skipPair(): void {
    this.loadNextPair(); // Skip to the next pair
  }

  completeRanking(): void {
    const recommendations = [
      {
        productCode: 'CODE1',
        shortDescription: 'Elegant Dress',
        designerName: 'Designer 1',
        images: [{ src: 'assets/images/Dress1.jpg' }],
        rank: 1,
      },
      {
        productCode: 'CODE2',
        shortDescription: 'Stylish Jacket',
        designerName: 'Designer 2',
        images: [{ src: 'assets/images/Dress2.jpg' }],
        rank: 2,
      },
      {
        productCode: 'CODE3',
        shortDescription: 'Chic Top',
        designerName: 'Designer 3',
        images: [{ src: 'assets/images/Dress3.jpg' }],
        rank: 3,
      },
      {
        productCode: 'CODE4',
        shortDescription: 'Casual Pants',
        designerName: 'Designer 4',
        images: [{ src: 'assets/images/Jacket1.jpg' }],
        rank: 4,
      },
      {
        productCode: 'CODE5',
        shortDescription: 'Trendy Skirt',
        designerName: 'Designer 5',
        images: [{ src: 'assets/images/Jacket2.jpg' }],
        rank: 5,
      },
    ];
    console.log('Navigating to leaderboard with:', recommendations);
    this.router.navigate(['/leaderboard'], { state: { recommendations } });
  }
}
