import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCardComponent } from '../../components/image-card/image-card.component';
import { BannerTopComponent } from "../../components/banner-top/banner-top.component";

@Component({
  selector: 'app-category-gender',
  standalone: true,
  imports: [ImageCardComponent, BannerTopComponent],
  templateUrl: './category-gender.component.html',
  styleUrl: './category-gender.component.scss'
})
export class CategoryGenderComponent {
  constructor(private router: Router) {}
  onWomanClick() {
    this.router.navigate(['/ranking/category/clothing/women']);
  }

  onManClick() {
    this.router.navigate(['/ranking/category/clothing/men']);
  }

}
