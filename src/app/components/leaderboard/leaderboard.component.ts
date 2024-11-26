import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Recommendation {
  productCode: string;
  shortDescription: string;
  designerName: string;
  images: Array<{ src: string }>;
  rank: number;
}

@Component({
  standalone: true,
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  imports: [CommonModule], 
})
export class LeaderboardComponent implements OnInit {
  recommendations: Recommendation[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Mock recommendations data for demonstration
    this.recommendations = [
      {
        productCode: 'CODE1',
        shortDescription: 'Elegant Dress',
        designerName: 'Designer 1',
        images: [{ src: 'assets/images/Dress1.jpg' }],
        rank: 1,
      },
      {
        productCode: 'CODE2',
        shortDescription: 'Stylish Dress',
        designerName: 'Designer 2',
        images: [{ src: 'assets/images/Dress2.jpg' }],
        rank: 2,
      },
      {
        productCode: 'CODE3',
        shortDescription: 'Chic Dress',
        designerName: 'Designer 3',
        images: [{ src: 'assets/images/Dress3.jpg' }],
        rank: 3,
      },
      {
        productCode: 'CODE4',
        shortDescription: 'Casual Dress',
        designerName: 'Designer 4',
        images: [{ src: 'assets/images/product1.jpg' }],
        rank: 4,
      },
      {
        productCode: 'CODE5',
        shortDescription: 'Trendy Dress',
        designerName: 'Designer 5',
        images: [{ src: 'assets/images/product2.jpg' }],
        rank: 5,
      },
    ];
  }

  goBack(): void {
    this.router.navigate(['/clothing-ranking']);
  }
}
