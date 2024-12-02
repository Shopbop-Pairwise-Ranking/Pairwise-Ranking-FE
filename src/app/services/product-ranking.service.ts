import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, mergeMap, Observable, of, retryWhen, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductRankingService {
  http = inject(HttpClient);

  getProducts(userId: string, category: string, gender: string): Observable<any> {
    const params = `?userId=${userId}&category=${category}&gender=${gender}`;
    return this.http.get(`${environment.apiBaseUrl}/api/products${params}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getLatestRanking(userId: string, category: string): Observable<any> {
    const params = `?userId=${userId}&categoryId=${category}`;
    return this.http.get(`${environment.apiBaseUrl}/api/latest-ranking${params}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getLatestTrending(category: string): Observable<any> {
    const params = `?categoryId=${category}`;
    return this.http.get(`${environment.apiBaseUrl}/api/trending-products${params}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  submitRankings(payload: any, userId: string, categoryId: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/api/update-ranking/user/${userId}/category/${categoryId}`, payload);
  }

  fetchRecommendations(userId: string, categoryId: string, latestRankingId?: string, poll: boolean = false): Observable<Product[]> {
    const endpoint = `${environment.apiBaseUrl}/api/recommendations`;
    const params: any = {
      userId,
      categoryId,
    };
    if (latestRankingId) {
      params.latestRankingId = latestRankingId;
    }

    const apiCall$ = this.http.get<any[]>(endpoint, { params }).pipe(
      mergeMap(response => {
        if (Array.isArray(response) && response.length > 0) {
          return of(response);
        }
        return throwError(() => new Error('Empty response, retrying...'));
      })
    );

    if (poll) {
      return apiCall$.pipe(
        retryWhen(errors =>
          errors.pipe(
            mergeMap((error, retryCount) => {
              if (retryCount >= 5) {
                return throwError(() => new Error('Max retries reached, no data found.'));
              }
              const waitTime = 5000 * (retryCount + 1);
              console.log(`Retrying in ${waitTime / 1000}s... for ${latestRankingId}`);
              return of(null).pipe(delay(waitTime));
            })
          )
        )
      );
    } else {
      return apiCall$;
    }
  }

}
