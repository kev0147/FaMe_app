import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient, Profile } from '../models';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  signed_up: Boolean = false;
  validationButtonHasBeenPressed: Boolean = false;
  signedUpPatient: Patient | undefined;

  patientForm = this.fb.group(
    {
      profileForm: this.fb.group({
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        email: ['', Validators.email]
      }),
      gender: [''],
      birth_date: ['', Validators.required]
    },
  );


  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router) { }

  onSubmit() {
    this.validationButtonHasBeenPressed = true;

    if (this.patientForm.valid) {
      let patient: Patient = this.formBuilderToPatient(this.patientForm);
      if (this.verifyIfAlreadyRegistered(patient)) {
        this.signed_up = true;
        this.patientService.addPatient(patient).subscribe(patient => {
          console.log(patient); this.addToLocalStorage(patient);
          this.goToChatPage(patient.id!);
        }, error => console.log(error));

      } else {
        //si je ne dois pas valider le patient
        this.goBack();
      }
    }
  }

  goToChatPage(patientId: string) {
    this.router.navigate(['chat'], { queryParams: { patientId: patientId } });
  }

  addToLocalStorage(patient: Patient) {
    localStorage.setItem('already_registered_patient_phone_number', String(patient?.profile.phone_number!));
    localStorage.setItem('already_registered_patient_name', patient?.profile.name!);
    localStorage.setItem('already_registered_patient_firstname', patient?.profile.firstname!);
  }

  verifyIfAlreadyRegistered(patient: Patient): Boolean {
    if (patient.profile.phone_number != Number(localStorage.getItem('already_registered_patient_phone_number')) && patient.profile.name != localStorage.getItem('already_registered_patient_name') && patient.profile.firstname != localStorage.getItem('already_registered_patient_firstname')) {
      return true;
    }
    return false;
  }

  formBuilderToPatient(form: FormGroup) {
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

  addPatientInDatabase(patient: Patient): Patient | undefined {
    this.patientService.addPatient(patient)
      .subscribe(patient => {
        this.signedUpPatient = patient;
        console.log(this.signedUpPatient);
      });
    return this.signedUpPatient;
  }

  goBack() {
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



