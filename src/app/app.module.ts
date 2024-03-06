import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MedicalExamComponent } from './medical-exam/medical-exam.component';
import { SpecialistAppointmentComponent } from './specialist-appointment/specialist-appointment.component';
import { MedicalTransportationComponent } from './medical-transportation/medical-transportation.component';
import { NursingComponent } from './nursing/nursing.component';
import { CoachingComponent } from './coaching/coaching.component';
import { ChatComponent } from './chat/chat.component';
import { LocationComponent } from './location/location.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    WelcomePageComponent,
    ConnexionComponent,
    DashboardComponent,
    HeaderComponent,
    MainComponent,
    AppointmentComponent,
    MedicalExamComponent,
    SpecialistAppointmentComponent,
    MedicalTransportationComponent,
    NursingComponent,
    CoachingComponent,
    ChatComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
