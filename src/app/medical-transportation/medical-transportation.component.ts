import { Component } from '@angular/core';
import { Appointment, Patient, Prestation, Token } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '../appointments.service';
import { PrestationsService } from '../prestations.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-medical-transportation',
  templateUrl: './medical-transportation.component.html',
  styleUrls: ['./medical-transportation.component.css']
})
export class MedicalTransportationComponent {
  token:Token =  {access:"",refresh:""};
  prestation!: Prestation ;
  patient!:Patient;

  appointmentForm = this.fb.group(
    {
      date: ['', Validators.required],
      time: ['', Validators.required]
    },
  );

  constructor(private router: Router, private route: ActivatedRoute, private appointmentsService: AppointmentsService, private patientService: PatientService, private prestationService:PrestationsService, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      if (params['access']) {
        this.token.access = params['access'];
        this.token.refresh = params['refresh'];

      }else{
        this.goToLoggin();
      }
    });

    this.patientService.getTheLoggedInPatient(this.token).subscribe(patient => this.patient=patient);
    this.prestationService.getPrestationById(this.token, 1).subscribe(prestation => this.prestation = prestation);

  }
  
  goBack(){
    this.router.navigate(['dashboard'], { queryParams: { access: this.token.access, refresh: this.token.refresh }});
  }

  goToLoggin(){
    this.router.navigate(['']);
  }
  
  formBuilderToAppointment(form: FormGroup){
    const appointment: Appointment = {
      prestation : this.prestation.id,
      patient: this.patient.id!,
      date: form.value.date,
      time: form.value.time
    }
    console.log(form.value.date);
    console.log(form.value.time);
    console.log(appointment);
    return appointment;
  }

  onSubmit(){
    let appointment = this.formBuilderToAppointment(this.appointmentForm);
    this.appointmentsService.addAppointment(appointment, this.token).subscribe();
    this.goBack()
  }

  emergency(){}
}
