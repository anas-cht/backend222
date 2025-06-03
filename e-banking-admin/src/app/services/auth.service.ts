import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();

  login(username: string, password: string) {
    // Your login logic here
    const user = { username }; // Replace with actual user data
    this.currentUserSubject.next(user);
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}