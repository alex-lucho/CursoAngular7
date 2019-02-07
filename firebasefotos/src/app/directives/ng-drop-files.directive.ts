import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';
import { of } from 'rxjs';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() archivosSobre: EventEmitter<any> = new EventEmitter();

  constructor(public elemento: ElementRef) { }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: any) {
    this.archivosSobre.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.archivosSobre.emit(false);
  }

  @HostListener('dragover', ['$event'])
  public onDragover(event: any) {
    const transferencia = this._getTransferencia(event);
    transferencia.dropEffect = 'copy';
    this._preventAndStop(event);
    this.archivosSobre.emit(true);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);
    if (!transferencia) {
      return;
    }
    this._agregarArchivos(transferencia.files);
    this.archivosSobre.emit(false);
    this._preventAndStop(event);
  }

  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _agregarArchivos( archivosLista: FileList) {
    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archTemporal = archivosLista[propiedad];
      if (this._fileCanBeLoaded(archTemporal)) {
        const nuevoArchivo = new FileItem(archTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }

    console.log(this.archivos);
  }

  private _preventAndStop(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileAlreadyDrop(nombreArchivo: string): boolean {
    // tslint:disable-next-line:forin
    for (const i in this.archivos) {
      const arch = this.archivos[i];
      if (arch.archivo.name === nombreArchivo) {
        console.log('Archivo ya existe en la lista', nombreArchivo);
        return true;
      }
    }

    return false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

  private _fileCanBeLoaded(archivo: File) {
    if (!this._fileAlreadyDrop(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    }
    return false;
  }


}
