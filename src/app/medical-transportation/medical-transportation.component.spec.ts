import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTransportationComponent } from './medical-transportation.component';

describe('MedicalTransportationComponent', () => {
  let component: MedicalTransportationComponent;
  let fixture: ComponentFixture<MedicalTransportationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalTransportationComponent]
    });
    fixture = TestBed.createComponent(MedicalTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
