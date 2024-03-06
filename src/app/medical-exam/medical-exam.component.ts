import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Token } from '../models';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-medical-exam',
  templateUrl: './medical-exam.component.html',
  styleUrls: ['./medical-exam.component.css']
})
export class MedicalExamComponent {
  
  token:Token =  {access:"",refresh:""};

  constructor(private router: Router, private route: ActivatedRoute,  private patientService: PatientService) {}
  
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      if (params['access']) {
        this.token.access = params['access'];
        this.token.refresh = params['refresh'];

      }else{
        this.goToLoggin();
      }
    });
  }
  
  goBack(){
    this.router.navigate(['dashboard'], { queryParams: { access: this.token.access, refresh: this.token.refresh }});
  }

  goToLoggin(){
    this.router.navigate(['']);
  }

}
