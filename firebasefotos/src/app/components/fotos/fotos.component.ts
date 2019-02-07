import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { AngularFireObject, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  imagenes: AngularFireList<any[]>;

  constructor(public _cargaImagenes: CargaImagenesService) {
    this.imagenes = this._cargaImagenes.listaUltimasImagenes(10);
     console.log('las imagenes: ', this.imagenes);
   }

  ngOnInit() {
  }

}
