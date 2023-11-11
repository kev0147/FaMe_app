import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient, Token } from '../models';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  token:Token =  {access:"",refresh:""};
  patient: Patient | undefined;
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['access']) {
        this.token.access = params['access'];
        this.token.refresh = params['refresh'];
      }
    });

    this.patientService.getTheLoggedInPatient(this.token).subscribe(patient => this.patient = patient);
  }

  constructor(private route: ActivatedRoute, private patientService: PatientService) {}
}
