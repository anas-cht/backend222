import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SupportmessageServiceTsService {

  constructor(private http: HttpClient) { }

  getAllrequestmessages() {
    return this.http.get<any[]>('http://localhost:8080/project_e_banking_war_exploded/api/admin/supportmessages/getallmessages');
  }

  deletemessage(id:number){
    return this.http.put<any[]>(`http://localhost:8080/project_e_banking_war_exploded/api/admin/supportmessages/deletemessage/${id}`,{})
  }

  addresponsemessage(msg:any){
    return this.http.post<any>('http://localhost:8080/project_e_banking_war_exploded/api/admin/supportmessages/addresponsemessage',msg)
  }
}
