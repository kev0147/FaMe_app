import { Component } from '@angular/core';
import { Token, User } from '../models';
import { FormBuilder, Validators } from '@angular/forms';
import { ConnexionService } from '../connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  user: User | undefined;
  token : Token | undefined;
  
  userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],     
    },
  );

  constructor(private fb: FormBuilder, private connexionService: ConnexionService, private router: Router){}

  onSubmit(){
    const user: User = {
      username : this.userForm.value?.username!,
      password : this.userForm.value.password!
    }
    this.connexionService.getToken(user).subscribe(token=>this.token = token);
    if(this.token){this.goToDashboard}
  }

  goToDashboard(token: Token){
    this.router.navigate(['/dashboard'], { queryParams: { data: JSON.stringify(token) } });
  }

  goBack(){
    this.router.navigate(['']);
  }

}
