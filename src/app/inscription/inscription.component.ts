import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Patient, Profile, User } from '../models';
import { InscriptionService } from '../inscription.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  patient: Patient | undefined;
  patientForm = this.fb.group(
    {
      profileForm: this.fb.group({
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        phone_number: ['', [Validators.required, phoneNumberFormatValidator]],
        email: ['', Validators.email]
      }),
      gender: ['', Validators.required],
      birth_date: ['']
    },
  );
  /*profileForm = new FormGroup({
    name: new FormControl(''),
    firstName: new FormControl(''),
    phone_number: new FormControl(''),
    email: new FormControl('')
  });*/

  constructor(private fb: FormBuilder, private inscriptionService: InscriptionService) { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.patientForm.value);
    const signedUpPatientProfile: Profile = {
      name: this.patientForm.value.profileForm?.name!,
      firstname: this.patientForm.value.profileForm?.firstname!,
      email: this.patientForm.value.profileForm?.email!,
      phone_number: Number(this.patientForm.value.profileForm?.phone_number!)
    }
    const signedUpPatient: Patient = {
      birth_date: this.formatDate(new Date(this.patientForm.value.birth_date!)),
      gender: this.patientForm.value.gender!,
      profile: signedUpPatientProfile
    };
    this.addPatient(signedUpPatient);

  }

  addPatient(patient: Patient) {
    this.inscriptionService.addPatient(patient)
      .subscribe(patient => {
        this.patient = patient;
      });
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


import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;

    // Validate if the input is exactly 8 digits
    const phoneRegex = /^\d{8}$/;

    if (!phoneRegex.test(phoneNumber)) {
      return { 'invalidPhoneNumberFormat': { value: control.value } };
    }

    return null; // Return null if validation passes
  };
}
