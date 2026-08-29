import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardPage, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
