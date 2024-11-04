import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShoppingBag, faSearch, faLocationDot, faChevronDown, faDollarSign, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class NavbarComponent {
  faHeart = faHeart;
  faShoppingBag = faShoppingBag;
  faSearch = faSearch;
  faLocation = faLocationDot;
  faChevronDown = faChevronDown;
  faDollar = faDollarSign;
  faGlobe = faGlobe;

  isAuthenticated$: Observable<boolean>;

  constructor(private router: Router, private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
  }
}
