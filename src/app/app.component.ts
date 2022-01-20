import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/auth.service';
import { Monitor } from './models/monitor.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    currentUser: Monitor;

    constructor(
        private router: Router,
        private authService: AuthService,
        private titleService: Title
    ) {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
        this.titleService.setTitle("Monitorizare Scoli");
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}