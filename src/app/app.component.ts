import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AutherizationService } from './services/autherization/autherization.service';
import { IUser } from './entity/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CSV Reader';
  isLogging = false;
  user? : IUser;

  constructor(private authService : AutherizationService) {
    
  }
  ngOnInit(): void {
    this.authService.isLogging().subscribe({
      next: (isLogged) => {
        this.isLogging = isLogged;
      }
    });
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }
}
