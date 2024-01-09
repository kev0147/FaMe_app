import { Component } from '@angular/core';
import { Token, User } from '../models';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  user: User | undefined;
  token : Token | undefined;
  errorMessage : Boolean = false;
  
  userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],     
    },
  );

  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router){}

  onSubmit(){
    const user: User = {
      username : this.userForm.value?.username!,
      password : this.userForm.value.password!
    }
    this.patientService.getToken(user).subscribe(token=>this.token = token);
    
    const accessToken = this.token?.access;
    if (accessToken) {
      this.goToDashboard();
    } else{
      this.errorMessage = true;
    }
  }

  goToDashboard(){
    this.router.navigate(['dashboard'], { queryParams: { access: this.token?.access, refresh: this.token?.refresh } });
  }

  goBack(){
    this.router.navigate(['']);
  }

}
