import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit {
  products: any[] = [];
  private apiUrl = '/public/folders'; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadWomenJeansProducts();
  }

  loadWomenJeansProducts(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (data) => {
        this.products = data.products.filter(
          (product: any) =>
            product.categoryId === '13255' && product.gender.toLowerCase() === 'women'
        ).map((product: any) => ({
          productSin: product.product.productSin,
          name: product.product.shortDescription,
          brand: product.product.designerName,
          imageUrl: product.product.colors[0].images[0].src // Assuming the first image is the main one
        }));
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  navigateToClothingRanking(): void {
    this.router.navigate(['/clothing-ranking']);
  }
}
