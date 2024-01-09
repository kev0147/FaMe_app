import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {

  constructor(private router: Router, private route: ActivatedRoute,  private patientService: PatientService) {}
  
  goBack(){
    this.router.navigate(['dashboard']);
  }

}
