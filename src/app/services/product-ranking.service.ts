import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRankingService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  http = inject(HttpClient);

  getProductRanking(userId: string, category: string, gender: string): Observable<any> {
    const params = `?userId=${userId}&category=${category}&gender=${gender}`;
    return this.http.get(`${this.apiUrl}/api/getProducts${params}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  submitSelection(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submitComparison`, payload);
  }  

}
