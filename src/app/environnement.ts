//const backendUrl = 'https://endeavor.pythonanywhere.com/';
const backendUrl = 'http://127.0.0.1:8000/';

export let id: string = '';

export const environment = {
    
    patients: `${backendUrl}patients`,
    patientInscription: `${backendUrl}patientInscription/inscription`,
    nonValidatedPatients: `${backendUrl}patients/non_validated_patients`,
    validatedPatients: `${backendUrl}patients/validated_patients`,
    patientValidation: `${backendUrl}patients/${id}/validation`,
    attributeDoctorToPatient: `${backendUrl}patients/${id}/doctor_attribution`,
    attributePatientToDoctor: `${backendUrl}doctors/${id}/patient_attribution`,
    doctors: `${backendUrl}doctors`,
    doctorInscription: `${backendUrl}doctors/inscription`,
    nonValidatedDoctors: `${backendUrl}doctors/non_validated_doctors`,
    validatedDoctors: `${backendUrl}doctors/validated_doctors`,
    doctorValidation: `${backendUrl}doctors/${id}/validation`,
    sendMessage: `${backendUrl}send_message`,
    getMessage: `${backendUrl}get_messages`,
    prestations: `${backendUrl}prestations`,
    services: `${backendUrl}services`,
    token: `${backendUrl}token/`,
    refreshToken:  `${backendUrl}token/refresh/`,
    getPatientFromToken: `${backendUrl}patients/get_patient_from_token`,
    appointments: `${backendUrl}appointments`
  };
  