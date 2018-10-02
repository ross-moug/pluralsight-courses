import { Injectable } from '@angular/core';
import { User } from '../components/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  loginUser(username: string, password: string): void {
    this.currentUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Papa',
      username: username
    };
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}