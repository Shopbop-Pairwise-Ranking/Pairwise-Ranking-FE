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
  designerName: string;
  price: string;
  imageURL: string;
}

type ProductSinMap = { [key: string]: number };

interface Rating {
  sin: string;
  rank: number;
  product: Product;
}

interface Matchups {
  itemA: string;
  itemB: string;
  winner: string;
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
  matchups: Matchups[] = [];

  rankings: Product[] = [];
  isLoading: boolean = true;
  isCompleted: boolean = false;
  submittedRankingId: string = '';

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
    const winner = (productA.productSin === selectedProduct.productSin) ? productA : productB;
    const looser = (productA.productSin !== selectedProduct.productSin) ? productA : productB;
    this.matchups.push({
      itemA: productA.productSin,
      itemB: productB.productSin,
      winner: winner.productSin
    });
    this.updateRatings(winner, looser);

    if (this.currentRound < Object.keys(this.rounds).length) {
      this.currentRound++;
      this.updateRound();
    } else {
      this.isCompleted = true;
    }

    if (this.isCompleted) {
      const payload = {
        matchups: this.matchups,
        rankings: this.rankings.reduce((acc, item, index) => {
          const key = item.productSin;
          acc[key] = index + 1;
          return acc;
        }, {} as ProductSinMap)
      }
      this.isLoading = true;
      this.productRankingService.submitRankings(payload, this.userId, this.product).subscribe(
        (response) => {
          this.isLoading = false;
          if (response?.rankingId) {
            this.submittedRankingId = response.rankingId;
            console.log(this.submittedRankingId);
          }
        },
        (error) => {
          console.error('Error submitting product ranking:', error);
          this.isLoading = false;
        }
      )
    }
  }

  updateRatings(winner: Product, looser: Product) {
    if (this.rankings.length) {
      const middleIndex = Math.floor(this.rankings.length / 2);
      this.rankings.splice(middleIndex, 0, ...[winner, looser]);
    } else {
      this.rankings = [winner, looser];
    }
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
    return this.rankings.length > 0;
  }
}
