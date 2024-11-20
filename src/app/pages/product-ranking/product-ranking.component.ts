import { Component, OnInit, inject, Input } from '@angular/core';
import { ProductRankingService } from '../../services/product-ranking.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { RankCardComponent } from '../../components/rank-card/rank-card.component';
import { BannerTopComponent } from '../../components/banner-top/banner-top.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

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
  private authService = inject(AuthService);
  rounds: any = {};
  currentRound = 1;
  productsToShow: Product[] = [];
  userId: string = '';

  ratings: Rating[] = [];
  isLoading: boolean = true;
  isCompleted: boolean = false;

  private iconLibrary = inject(FaIconLibrary);

  constructor() {
    this.iconLibrary.addIcons(faClock);
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.userId = this.authService.getUserId() || '';
    }
    this.fetchProducts(this.userId, this.product, this.gender);
  }

  fetchProducts(userId: string, productCategory: string, gender: string) {
    this.isLoading = true;
    this.productRankingService.getProducts(userId, productCategory, gender).subscribe(
      (response) => {
        this.rounds = response;
        this.updateRound();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching product ranking:', error);
        this.isLoading = false;
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
        this.updateRatings(response.updatedRatings, productA, productB);

        if (this.currentRound < Object.keys(this.rounds).length) {
          this.currentRound++;
          this.updateRound();
        } else {
          this.isCompleted = true;
        }
      },
      (error) => {
        console.error('Error submitting selection:', error);
      }
    );
  }

  updateRatings(response: any, productA: Product, productB: Product) {
    const existingA = this.ratings.find(r => r.sin === productA.productSin);
    if (existingA) {
      existingA.rating = response[productA.productSin];
    } else {
      this.ratings.push({ sin: productA.productSin, rating: response[productA.productSin], product: productA });
    }

    const existingB = this.ratings.find(r => r.sin === productB.productSin);
    if (existingB) {
      existingB.rating = response[productB.productSin];
    } else {
      this.ratings.push({ sin: productB.productSin, rating: response[productB.productSin], product: productB });
    }

    this.ratings.sort((a, b) => b.rating - a.rating);
  }

  onPassClick() {
    if (this.currentRound < Object.keys(this.rounds).length) {
      this.currentRound++;
      this.updateRound();
    } else {
      this.isCompleted = true;
    }
  }

  hasRatings(): boolean {
    return this.ratings.length > 0;
  }
}
