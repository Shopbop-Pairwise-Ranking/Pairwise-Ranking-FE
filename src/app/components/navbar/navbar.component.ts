import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShoppingBag, faSearch, faLocationDot, faChevronDown, faDollarSign, faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule]
})
export class NavbarComponent {
  constructor (private router: Router) {}

  faHeart = faHeart;
  faShoppingBag = faShoppingBag;
  faSearch = faSearch;
  faLocation = faLocationDot;
  faChevronDown = faChevronDown;
  faDollar = faDollarSign;
  faGlobe = faGlobe

  onLogoClick() {
    this.router.navigate(['/ranking']);
  }
}
