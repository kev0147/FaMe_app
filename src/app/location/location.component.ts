import { Component } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { Position } from '../models';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent {

  position: Position = {
    lat: 12.378799596570946,
    lng: -1.5039100064946345,
  };

  loader = new Loader({
    apiKey: "AIzaSyCsbCoKG6cvmw06kOrPePAsR1rMP_3zUpw",
    version: "weekly",
  });

  async load(position: Position) {
    this.loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const map = new Map(document.getElementById("map") as HTMLElement, {
        center: position,
        zoom: 15,
      });

      const marker = new Marker({
        map: map,
        position: position,
        title: 'Uluru'
      });
    });
  }


  ngOnInit(): void {
    this.load(this.position);
  }

  getCurrentLocation(event:MouseEvent) {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          
          const pos : Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.load(pos);
          this.position = pos;

          console.log(`Current position: Latitude ${pos.lat}, Longitude ${pos.lng}`);
          console.log(position.coords.accuracy);
        },
        (error) => {
          console.error('Error: The Geolocation service failed.');
          console.log(error);
        }
      );
    } else {
      console.error('Error: Your browser does not support geolocation.');
    }
  }

}












