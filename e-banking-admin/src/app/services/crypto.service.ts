import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  private coingeckoUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  private apiBaseUrl = 'http://localhost:8080/project_e_banking_war_exploded/api/crypto';
  private baseParams = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '100',
    page: '1',
    sparkline: 'false'
  };

  private allCryptos: any[] = [];

  constructor(private http: HttpClient) {}

  // Get crypto data from CoinGecko
  getCryptoData(): Observable<any> {
    return this.http.get(this.coingeckoUrl, { params: this.baseParams }).pipe(
      catchError(error => {
        console.error('Error fetching crypto data:', error);
        return throwError(() => new Error('Failed to fetch cryptocurrency data'));
      })
    );
  }

  // Get all cryptos from backend (with user verification)
  getAllCryptos(userId: number): Observable<CryptoCurrencyDto[]> {
    return this.http.get<CryptoCurrencyDto[]>(`${this.apiBaseUrl}/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching cryptos:', error);
        return throwError(() => new Error('Failed to fetch cryptocurrencies'));
      })
    );
  }

  // Search cryptos from backend (with user verification)
  searchCryptos(userId: number, query: string): Observable<CryptoCurrencyDto[]> {
    return this.http.get<CryptoCurrencyDto[]>(
      `${this.apiBaseUrl}/search/${userId}?query=${encodeURIComponent(query)}`
    ).pipe(
      catchError(error => {
        console.error('Error searching cryptos:', error);
        return throwError(() => new Error('Failed to search cryptocurrencies'));
      })
    );
  }

  // Get crypto details from backend (with user verification)
  getCryptoDetails(userId: number, cryptoId: string): Observable<CryptoCurrencyDto> {
    return this.http.get<CryptoCurrencyDto>(
      `${this.apiBaseUrl}/details/${userId}/${cryptoId}`
    ).pipe(
      catchError(error => {
        console.error('Error getting crypto details:', error);
        return throwError(() => new Error('Failed to get cryptocurrency details'));
      })
    );
  }

  // Buy crypto
  buyCrypto(userId: number, transaction: any): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/buy/${userId}`, 
      transaction,
      { responseType: 'text' }
    ).pipe(
      catchError(error => {
        console.error('Error buying crypto:', error);
        return throwError(() => new Error(error.error || 'Failed to buy cryptocurrency'));
      })
    );
  }

  // Sell crypto
  sellCrypto(userId: number, transaction: any): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/sell/${userId}`, 
      transaction,
      { responseType: 'text' }
    ).pipe(
      catchError(error => {
        console.error('Error selling crypto:', error);
        return throwError(() => new Error(error.error || 'Failed to sell cryptocurrency'));
      })
    );
  }

  // Get user transactions
  getUserTransactions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/transactions/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching transactions:', error);
        return throwError(() => new Error('Failed to fetch transactions'));
      })
    );
  }

  // Local search (for UI filtering)
  localSearch(query: string): any[] {
    if (!query) return this.allCryptos;
    return this.allCryptos.filter(crypto => 
      crypto.name.toLowerCase().includes(query.toLowerCase()) || 
      crypto.symbol.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Set all cryptos (for local search)
  setAllCryptos(cryptos: any[]): void {
    this.allCryptos = cryptos;
  }
}

interface CryptoCurrencyDto {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  // Add other properties as needed
}