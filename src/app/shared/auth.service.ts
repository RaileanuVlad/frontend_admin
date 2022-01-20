import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../shared/api.service';
import { Monitor } from '../models/monitor.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<Monitor>;
    public currentUser: Observable<Monitor>;

    constructor(private http: HttpClient, private api: ApiService) {
        this.currentUserSubject = new BehaviorSubject<Monitor>(JSON.parse(localStorage.getItem('currentUserAdmin')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Monitor {
        return this.currentUserSubject.value;
    }

    public getUser(): Observable<Monitor | null> {
        return this.currentUser;
    }

    login(email: string, parola: string) {
        return this.http.post<any>(`${this.api.baseUrl}/monitor/authenticatem`, { email, parola })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUserAdmin', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUserAdmin');
        this.currentUserSubject.next(null);
    }
}