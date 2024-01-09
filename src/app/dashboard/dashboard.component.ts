import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute,  private patientService: PatientService) {}

  goThere(location:string){
    this.router.navigate([location], { queryParams: { access: this.token?.access, refresh: this.token?.refresh } })
  }
}
