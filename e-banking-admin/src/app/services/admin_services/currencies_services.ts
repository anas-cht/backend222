import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Currency{
  id:number,
  name:string,
  code:string,
  buyRate:number,
  sellRate:number,
  symbol:string,
  country:string,
  amount:number
}

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

constructor(private http: HttpClient) {}

addcurrency(currency:Currency){
  return this.http.post<Currency>('http://localhost:8080/project_e_banking_war_exploded/api/admin/devise/adddevise', currency);
}

getCurrencies() {
  return this.http.get<any[]>('http://localhost:8080/project_e_banking_war_exploded/api/admin/devise/devises');
}

toggleCurrencyStatus(id: number) {
  return this.http.put<any>(`http://localhost:8080/project_e_banking_war_exploded/api/admin/devise/changestatus/${id}`,{});
}

updatecurrency(currency:Currency){
  return this.http.post<Currency>('http://localhost:8080/project_e_banking_war_exploded/api/admin/devise/updatedevise', currency);
}




}
