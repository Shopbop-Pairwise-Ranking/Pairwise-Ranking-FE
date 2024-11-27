import { Component, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { ProductRankingService } from '../../services/product-ranking.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { RankCardComponent } from '../../components/rank-card/rank-card.component';
import { BannerTopComponent } from '../../components/banner-top/banner-top.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../interfaces/product';
import { Matchups } from '../../interfaces/matchups';
import { LatestRankingResponse } from '../../interfaces/latest-rankin-response';
import { Subject, of, catchError, switchMap, takeUntil } from 'rxjs';

type ProductSinMap = { [key: string]: number };

@Component({
  selector: 'app-product-ranking',
  templateUrl: './product-ranking.component.html',
  styleUrls: ['./product-ranking.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RankCardComponent, BannerTopComponent, FontAwesomeModule]
})
export class ProductRankingComponent implements OnInit, OnDestroy {
  @Input() product!: string;
  @Input() gender!: string;

  private productRankingService = inject(ProductRankingService);
  private authService = inject(AuthService);
  private iconLibrary = inject(FaIconLibrary);

  private destroy$ = new Subject<void>();
  private recommendationDestroy$ = new Subject<void>();
  private switchMapRecommendationDestroy$ = new Subject<void>();

  rounds: any = {};
  currentRound = 1;
  productsToShow: Product[] = [];
  userId: string = '';
  matchups: Matchups[] = [];
  timestamp: Date | undefined;
  rankings: Product[] = [];
  isLoading: boolean = true;
  isCompleted: boolean = false;
  recommendations: Product[] = [];
  submittedRankingId: string = '';

  constructor() {
    this.iconLibrary.addIcons(faClock);
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.userId = this.authService.getUserId() || '';
    }
    this.fetchLatestRanking();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.recommendationDestroy$.next();
    this.recommendationDestroy$.complete();
    this.switchMapRecommendationDestroy$.next();
    this.switchMapRecommendationDestroy$.complete();
  }

  fetchLatestRanking() {
    this.isLoading = true;
    this.productRankingService.getLatestRanking(this.userId, this.product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: LatestRankingResponse) => {
          this.isLoading = false;
          if (response?.ranks || response?.products || response?.timestamp) {
            const { ranks, products } = response;
            this.timestamp = response.timestamp;
            this.rankings = products
              .filter(product => product.productSin in ranks)
              .sort((a, b) => ranks[a.productSin] - ranks[b.productSin]);
            this.isCompleted = true;
            this.submittedRankingId = response.latestRankingId;
            if (!response.recommendations.length) {
              this.fetchRecommendations();
            }
          } else {
            this.fetchProducts();
          }
        },
        (error) => {
          console.error('Error fetching latest ranking:', error);
          this.fetchProducts();
          this.isLoading = false;
        }
      );
  }

  fetchProducts() {
    this.isLoading = true;
    this.productRankingService.getProducts(this.userId, this.product, this.gender)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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

  fetchRecommendations() {
    this.recommendationDestroy$.next();

    this.isLoading = true;
    this.productRankingService.fetchRecommendations(this.userId, this.product, this.submittedRankingId, true)
      .pipe(takeUntil(this.recommendationDestroy$))
      .subscribe(
        (response: Product[]) => {
          this.recommendations = response;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching recommendations', error);
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
      this.submitRankingAndFetchRecommendations();
    }
  }

  submitRankingAndFetchRecommendations() {
    const payload = {
      matchups: this.matchups,
      rankings: this.rankings.reduce((acc, item, index) => {
        const key = item.productSin;
        acc[key] = index + 1;
        return acc;
      }, {} as ProductSinMap)
    };

    this.switchMapRecommendationDestroy$.next();

    this.isLoading = true;
    this.productRankingService.submitRankings(payload, this.userId, this.product)
      .pipe(
        takeUntil(this.switchMapRecommendationDestroy$),
        switchMap((response) => {
          if (response?.rankingId) {
            this.submittedRankingId = response.rankingId;
          }
          return this.productRankingService.fetchRecommendations(this.userId, this.product, this.submittedRankingId, true)
            .pipe(takeUntil(this.switchMapRecommendationDestroy$));
        }),
        catchError(error => {
          this.isLoading = false;
          console.error('Error submitting product ranking:', error);
          return of(null);
        })
      )
      .subscribe((recommendationResponse) => {
        this.isLoading = false;
        if (recommendationResponse) {
          this.recommendations = recommendationResponse;
        }
      });
  }

  updateRatings(winner: Product, looser: Product) {
    if (this.rankings.length) {
      const middleIndex = Math.floor(this.rankings.length / 2);
      this.rankings.splice(middleIndex, 0, ...[winner, looser]);
    } else {
      this.rankings = [winner, looser];
    }
  }

  onRetryClick() {
    this.rankings = [];
    this.isCompleted = false;
    this.currentRound = 1;
    this.matchups = [];
    this.timestamp = undefined;

    this.recommendationDestroy$.next();
    this.switchMapRecommendationDestroy$.next();

    this.fetchProducts();
  }

  hasRatings(): boolean {
    return this.rankings.length > 0;
  }
}
