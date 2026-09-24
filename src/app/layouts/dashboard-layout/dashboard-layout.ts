import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout implements OnInit {

  constructor(protected pfService : ProfileService, protected router : Router) {
  }

  async ngOnInit() {
    this.pfService.fetchProfile();
    console.log("this.pfService.getProfile().role !== 'admin'" , this.pfService.getProfile().role !== 'admin');

  }
}
