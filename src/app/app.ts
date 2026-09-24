import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { CategoryService } from './services/category-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardPage, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(public cateService: CategoryService) {
  }

  ngOnInit() {
    this.cateService.fetchCategories();
  }
}
