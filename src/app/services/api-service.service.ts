import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getBrandsInProject(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/get-brands`, null);
  }

  getPostsInBrand(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/get-posts`, requestBody);
  }

}
