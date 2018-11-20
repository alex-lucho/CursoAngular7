import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  mostrar = true;
  texto = 'Un gran poder requiere una gran responsabilidad.';
  autor = 'Ben Parker.';

  personajes: string[] = ['Spiderman', 'Venom', 'Dr. Octopus'];

}
