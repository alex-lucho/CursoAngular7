import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent {

  estaSobreDropZone = false;
  permiteCargar = true;
  archivos = [];

  constructor(public _cargaImagenes: CargaImagenesService) { }

  archivoSobreDropZone(e: boolean) {
    this.estaSobreDropZone = e;
  }

  cargarImagenesFirebase() {
    this.permiteCargar = false;
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
    this.permiteCargar = true;
  }

}
