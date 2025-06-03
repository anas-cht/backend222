import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RagService {
  private apiUrl = 'http://localhost:5005/ask';

  constructor(private http: HttpClient) {}

  askRag(query: string, history: { role: string, content: string }[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, { query, history });
  }
}
