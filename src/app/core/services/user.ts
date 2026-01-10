import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/Iuser';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }

  getUsers(limit: number, skip: number): Observable<{ users: IUser[]; total: number }> {
    return this.http.get<{ users: IUser[]; total: number }>(
      `${this.baseUrl}?limit=${limit}&skip=${skip}`
    );
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${userId}`);
  }
}
