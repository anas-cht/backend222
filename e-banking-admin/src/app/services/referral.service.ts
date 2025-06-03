import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReferralService {
  private baseUrl = 'http://localhost:8080/project_e_banking_war_exploded/api/user/commission';
  
  constructor(private http: HttpClient) {}

  getReferralCommission(userId: number): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    });

    return this.http.get<number>(`${this.baseUrl}/${userId}`, { headers }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        if (error.status === 403) {
          return throwError(() => new Error(error.error?.message || 'You are not enabled for referrals'));
        } else if (error.status === 404) {
          return throwError(() => new Error(error.error?.message || 'User settings not found'));
        } else {
          return throwError(() => new Error(
            error.error?.message || error.message || 'Failed to load commission'
          ));
        }
      })
    );
  }
}