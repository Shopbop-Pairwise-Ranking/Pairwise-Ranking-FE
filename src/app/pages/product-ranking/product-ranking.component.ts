import { Component, OnInit, inject, Input } from '@angular/core';
import { ProductRankingService } from '../../services/product-ranking.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { RankCardComponent } from '../../components/rank-card/rank-card.component';
import { BannerTopComponent } from '../../components/banner-top/banner-top.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

interface Product {
  productSin: string;
  shortDescription: string;
  name: string;
  price: string;
  imageUrl: string;
}

interface Rating {
  sin: string;
  rating: number;
  product: Product;
}

@Component({
  selector: 'app-product-ranking',
  templateUrl: './product-ranking.component.html',
  styleUrls: ['./product-ranking.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RankCardComponent, BannerTopComponent, FontAwesomeModule]
})
export class ProductRankingComponent implements OnInit {
  @Input() product!: string;
  @Input() gender!: string;
  private productRankingService = inject(ProductRankingService);
  rounds: any = {};
  currentRound = 1;
  productsToShow: Product[] = [];
  userId: string = 'user123'; // Example user ID, replace with actual

  // State variables
  ratings: Rating[] = [];
  isLoading: boolean = true; // Track loading state
  isCompleted: boolean = false; // Track completion state

  private iconLibrary = inject(FaIconLibrary);

  constructor() {
    this.iconLibrary.addIcons(faClock);
  }

  ngOnInit(): void {
    this.fetchProductRanking(this.userId, this.product, this.gender); // Replace 'woman' dynamically
  }

  fetchProductRanking(userId: string, productCategory: string, gender: string) {
    this.isLoading = true; // Start loading
    this.productRankingService.getProductRanking(userId, productCategory, gender).subscribe(
      (response) => {
        this.rounds = response;
        this.updateRound();
        this.isLoading = false; // Stop loading
      },
      (error) => {
        console.error('Error fetching product ranking:', error);
        this.isLoading = false; // Stop loading even on error
      }
    );
  }

  updateRound() {
    this.productsToShow = this.rounds[this.currentRound];
  }

  onProductClick(selectedProduct: Product) {
    const [productA, productB] = this.productsToShow;
    const payload = {
      userId: this.userId,
      categoryId: this.product,
      itemA: productA.productSin,
      itemB: productB.productSin,
      winner: selectedProduct.productSin
    };

    this.productRankingService.submitSelection(payload).subscribe(
      (response) => {
        this.updateRatings(response, productA, productB);

        // Proceed to the next round if available
        if (this.currentRound < Object.keys(this.rounds).length) {
          this.currentRound++;
          this.updateRound();
        } else {
          this.isCompleted = true; // Mark as completed after the last round
        }
      },
      (error) => {
        console.error('Error submitting selection:', error);
      }
    );
  }

  updateRatings(response: any, productA: Product, productB: Product) {
    const { itemA_sin, itemB_sin } = response;

    const existingA = this.ratings.find(r => r.sin === productA.productSin);
    if (existingA) {
      existingA.rating = itemA_sin;
    } else {
      this.ratings.push({ sin: productA.productSin, rating: itemA_sin, product: productA });
    }

    const existingB = this.ratings.find(r => r.sin === productB.productSin);
    if (existingB) {
      existingB.rating = itemB_sin;
    } else {
      this.ratings.push({ sin: productB.productSin, rating: itemB_sin, product: productB });
    }

    this.ratings.sort((a, b) => b.rating - a.rating);
  }

  onPassClick() {
    if (this.currentRound < Object.keys(this.rounds).length) {
      this.currentRound++;
      this.updateRound();
    } else {
      this.isCompleted = true; // Mark as completed after the last round
    }
  }

  hasRatings(): boolean {
    return this.ratings.length > 0;
  }
}
