import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { identifier: 'test@example.com', password: 'password123' },
    { identifier: '1234567890', password: 'password456' }
  ];

  userExists(identifier: string): boolean {
    return this.users.some(user => user.identifier === identifier);
  }

  validatePassword(identifier: string, password: string): boolean {
    const user = this.users.find(user => user.identifier === identifier);
    return user ? user.password === password : false;
  }
}
