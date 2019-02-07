export class FileItem {
    public archivo: File;
    public nombreArchivo: string;
    public url: any;
    public estaSubiendo: boolean;
    public progreso: number;

    constructor( archivo: File ) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
    }
}
