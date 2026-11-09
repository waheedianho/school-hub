import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'school-hub-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
