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
  errorMessage : string = '';
  
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
    this.patientService.getToken(user).subscribe(token=>this.authenticate(token), err => this.error(err),);
  }

  error(err:any){
    console.error( err);
    this.errorMessage = 'Mauvais identifiants';
  }

  authenticate(token: Token){
    this.goToDashboard(token);
  }

  goToDashboard(token: Token){
    this.router.navigate(['dashboard'], { queryParams: { access: token.access, refresh: token.refresh } });
  }

  goBack(){
    this.router.navigate(['']);
  }

}
