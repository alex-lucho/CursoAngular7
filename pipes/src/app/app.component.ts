import { Component } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre = 'Alexyz';
  fullName = 'herberTH alEXander luCHo herNAndez';
  arreglo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  PI = Math.PI;
  a = 0.234;
  salario = 1234.5;
  heroe = {
    nombre: 'Logan',
    clave: 'Wolverine',
    edad: '500',
    direccion: {
      calle: 'Primera',
      casa: '19'
    }
  };

  valorDePromesa = new Promise((resolve) => {
    setTimeout(() => resolve('Llego la data!'), 3500);
  });

  fecha = new Date();
  video = 'O5u8ATj2wzo';
  activar = true;
}
