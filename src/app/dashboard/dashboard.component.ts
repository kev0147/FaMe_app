import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  token:Token | undefined;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.token = JSON.parse(params['data']);
      }
    });
  }
}
