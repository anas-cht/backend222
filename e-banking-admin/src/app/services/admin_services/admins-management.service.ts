import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminsManagementService {

  constructor(private http:HttpClient ) {}

  getalladmins(){
    return this.http.get<any[]>('http://localhost:8080/project_e_banking_war_exploded/api/admin/getalladmins');
  }

  addadmin(admin:any){
    return this.http.post<any>('http://localhost:8080/project_e_banking_war_exploded/api/admin/addadmin',admin);
  }

  deleteadmin(admin:any){
    return this.http.post<any>('http://localhost:8080/project_e_banking_war_exploded/api/admin/deleteadmin',admin);
  }

  updateadmin(admin:any){
    return this.http.post<any>('http://localhost:8080/project_e_banking_war_exploded/api/admin/updateadmin',admin);
  }

}
