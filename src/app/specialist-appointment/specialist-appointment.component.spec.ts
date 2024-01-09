import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAppointmentComponent } from './specialist-appointment.component';

describe('SpecialistAppointmentComponent', () => {
  let component: SpecialistAppointmentComponent;
  let fixture: ComponentFixture<SpecialistAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialistAppointmentComponent]
    });
    fixture = TestBed.createComponent(SpecialistAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
