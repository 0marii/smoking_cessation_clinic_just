import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinic-dashboard',
  templateUrl: './clinic-dashboard.component.html',
  styleUrls: ['./clinic-dashboard.component.css'],
})
export class ClinicDashboardComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private router: Router) {}
}
