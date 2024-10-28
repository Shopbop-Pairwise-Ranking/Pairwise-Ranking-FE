import { Component, Input, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerTopComponent } from '../../components/banner-top/banner-top.component';
import { ImageCardComponent } from '../../components/image-card/image-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-clothing',
  standalone: true,
  imports: [CommonModule, ImageCardComponent, BannerTopComponent],
  templateUrl: './category-clothing.component.html',
  styleUrl: './category-clothing.component.scss'
})
export class CategoryClothingComponent implements OnInit {

  @Input() gender!: string;

  categories: any = []

  categories_women = [
    {
      imageSrc: 'assets/images/denims.jpg',
      altText: 'Image of a woman wearing denims.',
      buttonText: 'Jeans'
    },
    {
      imageSrc: 'assets/images/skirt.jpg',
      altText: 'Image of a woman wearing a skirt.',
      buttonText: 'Skirts'
    },
    {
      imageSrc: 'assets/images/jacket.jpg',
      altText: 'Image of a woman wearing a jacket.',
      buttonText: 'Jackets'
    },
    {
      imageSrc: 'assets/images/dress.jpg',
      altText: 'Image of a woman wearing a dress.',
      buttonText: 'Dresses'
    }
  ];

  categories_men = [
    {
      imageSrc: 'assets/images/jeans.jpg',
      altText: 'Image of a man wearing jeans.',
      buttonText: 'Jeans'
    },
    {
      imageSrc: 'assets/images/tshirt.jpg',
      altText: 'Image of a man wearing a t-shirt.',
      buttonText: 'T-Shirts'
    },
    {
      imageSrc: 'assets/images/coat.jpg',
      altText: 'Image of a man wearing a coat.',
      buttonText: 'Coats'
    },
    {
      imageSrc: 'assets/images/shoes.jpg',
      altText: 'Image of men\'s shoes.',
      buttonText: 'Shoes'
    }
  ];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.categories = this.gender.toString().toLowerCase() == 'women' ? this.categories_women : this.categories_men;
  }


  onProductClick(product: string) {
    this.router.navigate([`/ranking/category/clothing/${this.gender}/${product.toLocaleLowerCase()}`]);
  }

}
