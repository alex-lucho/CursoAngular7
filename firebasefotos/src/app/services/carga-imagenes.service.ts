import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireObject, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = '/img';

  constructor(public af: AngularFireModule, private afd: AngularFireDatabase) { }

  listaUltimasImagenes( numeroImagenes: number ): AngularFireList<any[]> {
    return this.afd.list(`${ this.CARPETA_IMAGENES }`,  ref =>
      ref.limitToLast(numeroImagenes)
      // }
    );
  }

  cargarImagenesFirebase(archivos: FileItem[]) {
    const storageRef = firebase.storage().ref();
    // tslint:disable-next-line:prefer-const
    for (let item of archivos) {
      item.estaSubiendo = true;
      const uploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progreso = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100,
        (error) => console.error('Error al subir', error),
        () => {
          uploadTask.then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
              item.estaSubiendo = false;
              // console.log(item);
              this.guardarImagen({ nombre: item.nombreArchivo, url: url });
            });
          });
          /* item.url = uploadTask.snapshot.downloadURL;
          item.estaSubiendo = false;
          console.log(item);
          this.guardarImagen({ nombre: item.nombreArchivo, url: item.url });*/
        }
      );
    }
  }

  private guardarImagen(imagen: any) {
    this.afd.list(`/${this.CARPETA_IMAGENES}`).push(imagen);
  }
}
