import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient, Profile, User } from '../models';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  signed_up : Boolean = false;
  validationButtonHasBeenPressed : Boolean = false;
  signedUpPatient: Patient | undefined;
  patientForm = this.fb.group(
    {
      profileForm: this.fb.group({
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        email: ['', Validators.email]
      }),
      gender: ['', Validators.required],
      birth_date: ['', Validators.required]
    },
  );

  
  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router) { }

  onSubmit() {
    this.validationButtonHasBeenPressed = true;
    if(this.patientForm.valid){
      this.validationButtonHasBeenPressed = true;
      let registeredPatient = this.formBuilderToPatient(this.patientForm)
      this.addPatientInDatabase(registeredPatient);
      console.log(this.signedUpPatient);
      
      //if(this.signedUpPatient){this.signed_up = true;}
      this.signed_up = true;
    }
  }

  formBuilderToPatient(form:FormGroup){
    const patientProfile: Profile = {
      name: form.value.profileForm?.name!,
      firstname: form.value.profileForm?.firstname!,
      email: form.value.profileForm?.email!,
      phone_number: Number(form.value.profileForm?.phone_number!)
    }
    const signedUpPatient: Patient = {
      birth_date: this.formatDate(new Date(form.value.birth_date!)),
      gender: form.value.gender!,
      profile: patientProfile
    };
    return signedUpPatient;
  }

  addPatientInDatabase(patient: Patient) {
    this.patientService.addPatient(patient)
      .subscribe(patient => {
        this.signedUpPatient = patient;
      });
  }

  goBack(){
    this.router.navigate(['']);
  }

  formatDate(patientBirthDate: Date) {

    // Get the year, month, and day from the date object
    const year = patientBirthDate.getFullYear();
    const month = String(patientBirthDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(patientBirthDate.getDate()).padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}



