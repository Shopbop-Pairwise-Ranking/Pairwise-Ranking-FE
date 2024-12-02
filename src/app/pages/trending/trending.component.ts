import { Component, inject } from '@angular/core';
import { ProductRankingService } from '../../services/product-ranking.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule, ProductCardComponent,],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss'
})
export class TrendingComponent {
  tabs = [
    { buttonText: 'Jeans' },
    { buttonText: 'Skirts' },
    { buttonText: 'Jackets' },
    { buttonText: 'Dresses' }
  ];
  private productRankingService = inject(ProductRankingService);

  trendingProducts: any[] = [];
  trendingTimestamp = '';
  selectedCategory = 'Jeans';

  constructor() {
    this.fetchTrendingProducts(this.selectedCategory); // Fetch initial trending products
  }

  fetchTrendingProducts(category: string) {
    this.selectedCategory = category;
    this.productRankingService.getLatestTrending(category.toLowerCase()).subscribe((response: any) => {
      this.trendingProducts = response.products.sort((a: any, b: any) => a.rank - b.rank);
      this.trendingTimestamp = response.timestamp;
    });
  }

}
