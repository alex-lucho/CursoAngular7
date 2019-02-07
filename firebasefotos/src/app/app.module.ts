import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// rutas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { DemoComponent } from './components/demo/demo.component';

// config
import { firebaseConfig } from './config/firebase.config';

// services
import { CargaImagenesService } from './services/carga-imagenes.service';

// directives
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    CargaComponent,
    FotosComponent,
    NgDropFilesDirective,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FileUploadModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    CargaImagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
