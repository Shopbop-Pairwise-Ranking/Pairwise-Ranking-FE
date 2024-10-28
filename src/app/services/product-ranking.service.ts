import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRankingService {
  private apiBaseUrl = 'http://localhost:3000';

  http = inject(HttpClient);

  getProducts(userId: string, category: string, gender: string): Observable<any> {
    const params = `?userId=${userId}&category=${category}&gender=${gender}`;
    return this.http.get(`${this.apiBaseUrl}/api/getProducts${params}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  submitSelection(payload: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/submitComparison`, payload);
  }

}
