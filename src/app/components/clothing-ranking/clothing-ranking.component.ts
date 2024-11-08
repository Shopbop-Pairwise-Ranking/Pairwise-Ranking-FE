import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  products: Product[] = []; // Placeholder for fetched products
  currentPair: Product[] = []; // Pair of products to be compared
  comparisonsLeft: number = 10; // Number of comparisons left
  index: number = 0;

  constructor(private route: ActivatedRoute) {}

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
      // Add more products as needed
    ];

    this.setupComparison();
  }

  setupComparison(): void {
    this.products = this.shuffle(this.products).slice(0, 30);
    this.loadNextPair();
  }

  loadNextPair(): void {
    if (this.index < this.products.length - 1 && this.comparisonsLeft > 0) {
      this.currentPair = [this.products[this.index], this.products[this.index + 1]];
      this.index += 2;
    } else {
      this.currentPair = [];
      console.log('Comparison completed!');
    }
  }

  shuffle(array: Product[]): Product[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectOption(selectedProduct: Product): void {
    this.comparisonsLeft--;
    if (this.comparisonsLeft > 0) {
      this.loadNextPair();
    } else {
      console.log('All comparisons completed!');
    }
  }

  skipPair(): void {
    if (this.comparisonsLeft > 0) {
      this.loadNextPair();
    }
  }
}

