import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { SpecialistAppointmentComponent } from './specialist-appointment/specialist-appointment.component';
import { MedicalTransportationComponent } from './medical-transportation/medical-transportation.component';
import { NursingComponent } from './nursing/nursing.component';
import { CoachingComponent } from './coaching/coaching.component';
import { MedicalExamComponent } from './medical-exam/medical-exam.component';

const routes: Routes = [
  { path: 'appointment', component: AppointmentComponent },
  { path: 'specialistAppointment', component: SpecialistAppointmentComponent },
  { path: 'medicalTransportation', component: MedicalTransportationComponent },
  { path: 'medicalExam', component: MedicalExamComponent },
  { path: 'nursing', component: NursingComponent },
  { path: 'coaching', component: CoachingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'welcome_page', component: WelcomePageComponent },
  { path: '', component: WelcomePageComponent },
  { path: '**', component: WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
