// src/app/services/system-settings.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SystemSettingsDto {
  id: number;
  commissionRate: number;
  maxTransactionAmount: number;
  transferLimit: number;
  cryptoEnabled: boolean;
  referralEnabled: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {
  private baseUrl = 'http://localhost:8080/project_e_banking_war_exploded/api/admin/users/settings';

  constructor(private http: HttpClient) {}

  getAllUserSettings(): Observable<SystemSettingsDto[]> {
    return this.http.get<SystemSettingsDto[]>(`${this.baseUrl}`);
  }

  
}
