import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() imageSrc: string = '';
  @Input() altText: string = 'Product Image';
  @Input() brand: string = '';
  @Input() name: string = '';
  @Input() price: string = '';
  @Input() rank?: number;

  @Output() wishlistClick = new EventEmitter<void>();
  @Output() productClick = new EventEmitter<void>();

  faHeart = faHeart;

  onWishlistClick() {
    this.wishlistClick.emit();
  }

  onProductClick() {
    this.productClick.emit();
  }
}




