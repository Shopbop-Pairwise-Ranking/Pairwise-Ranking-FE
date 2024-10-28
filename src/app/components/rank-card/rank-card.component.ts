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
  @Input() imageSrc: string = '';
  @Input() altText: string = 'Product Image';
  @Input() brand: string = '';
  @Input() name: string = '';
  @Input() price: string = '';
  @Input() rank: number = 1;

  @Output() wishlistClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();

  faHeart = faHeart;
  faShopping = faShoppingBag;

  onWishlistClick() {
    this.wishlistClick.emit();
  }

  onCartClick() {
    this.cartClick.emit();
  }
}

