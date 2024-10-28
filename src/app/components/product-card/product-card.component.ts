import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() imageSrc: string = '';           // Image path
  @Input() altText: string = 'Product Image'; // Alt text for accessibility
  @Input() brand: string = '';              // Product brand
  @Input() name: string = '';               // Product name
  @Input() price: string = '';              // Product price

  @Output() wishlistClick = new EventEmitter<void>(); // Event for wishlist button
  @Output() productClick = new EventEmitter<void>(); // Event for clicking the whole card

  faHeart = faHeart;

  // Function to emit the wishlist click event
  onWishlistClick() {
    this.wishlistClick.emit();
  }

  // Function to emit the product click event
  onProductClick() {
    this.productClick.emit();
  }
}




