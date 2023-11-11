import { Component, Input } from '@angular/core';
import { Patient } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() patient : Patient | undefined;
}
