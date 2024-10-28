import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rank-card',
  templateUrl: './rank-card.component.html',
  styleUrls: ['./rank-card.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule]
})
export class RankCardComponent {
  @Input() imageSrc: string = '';           // Product image
  @Input() altText: string = 'Product Image'; // Alt text for accessibility
  @Input() brand: string = '';              // Product brand
  @Input() name: string = '';               // Product name
  @Input() price: string = '';              // Product price
  @Input() rank: number = 1;                // Rank number

  @Output() wishlistClick = new EventEmitter<void>(); // Event for wishlist button
  @Output() cartClick = new EventEmitter<void>();     // Event for cart button

  faHeart = faHeart;
  faShopping = faShoppingBag;

  // Functions to emit events
  onWishlistClick() {
    this.wishlistClick.emit();
  }

  onCartClick() {
    this.cartClick.emit();
  }
}

