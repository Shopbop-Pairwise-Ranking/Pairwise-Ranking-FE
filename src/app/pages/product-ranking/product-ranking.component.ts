import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { BannerTopComponent } from '../../components/banner-top/banner-top.component';
import { RankCardComponent } from '../../components/rank-card/rank-card.component';

@Component({
  selector: 'app-product-ranking',
  templateUrl: './product-ranking.component.html',
  styleUrls: ['./product-ranking.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent, BannerTopComponent, RankCardComponent]
})
export class ProductRankingComponent implements OnInit {
  @Input() product!: string;
  // Example products to display
  product1 = {
    imageSrc: 'assets/images/product1.jpg',
    altText: 'Veronica Beard White Saude Dress',
    brand: 'Veronica Beard',
    name: 'White Saude Dress',
    price: '$300.00'
  };

  product2 = {
    imageSrc: 'assets/images/product2.jpg',
    altText: 'Rendoll White Elena Dress',
    brand: 'Rendoll',
    name: 'White Elena Dress',
    price: '$350.00'
  };

  ngOnInit(): void {

  }

  // Function to handle product click
  onProductClick(product: any) {
    console.log(`Selected product: ${product.name}`);
  }

  // Function to handle Pass button click
  onPassClick() {
    console.log('Pass button clicked');
  }
}
