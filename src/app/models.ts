export interface Profile {
    id?: number;
    name?: string;
    firstname?: string;
    email?: string; // Optional field
    phone_number: number;
    user?: User;
}

export interface Patient {
    id?: string;
    gender?: string;
    birth_date?: string;
    profile: Profile;
}

export interface Token {
    access: string;
    refresh: string;
}


export interface User {
    username: string;
    password: string;
}












export interface Appointment {
    id?: number
    prestation: number;
    patient: string;
    date: string;
    time: string;
}

export interface AppointmentSimple {
    key: string;
    prestation: number;
    patient: string;
    dateOfAppointment: string;
    dateOfReservation:  string;
}


export interface Prestation {
    id: number;
    prestation: string;
    price: number;
}

export interface Report {
    prescription: string;
    comments: number;
}

export interface Service {
    date: Date;
    patient: number;
    prestation: number;
    report: number;
}

export interface Agent {
    profil: string;
    speciality: string;
}

interface Administrator {
    profil: string;
}

export interface Message {
    key: string;
    sender: string;
    receiver: string;
    message: string;
}

export interface Notif {
    id?: string;
    type: string;
    patient: string;
    date: string;
    dismissed: Boolean;
}

export interface Position
{ lat: number, lng: number }