import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(private el: ElementRef) {
    console.log('Directiva llamada');
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

  @Input('appResaltado') nuevoColor: String;

  @HostListener('mouseenter') mouseEntro() {
    this.resaltar(this.nuevoColor);
  }

  @HostListener('mouseleave') mouseSalio() {
    this.resaltar(null);
  }

  private resaltar(color: String) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
