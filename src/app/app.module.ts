import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from '@angular/fire/compat'; // Importa el módulo de AngularFire
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa el módulo de autenticación de AngularFire

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { environtmet } from '../enviroments/enviroments';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatorComponent } from './components/translator/translator.component'; // Importación del módulo MatProgressSpinnerModule
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { AdmComponent } from './components/adm/adm.component';
import { TranslationlistComponent } from './components/translationlist/translationlist.component';
import { EditTranslationComponent } from './components/edit-translation/edit-translation.component';
import { MatListModule } from '@angular/material/list';
import { MatTable, MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    TranslatorComponent,
    FooterComponent,
    UserComponent,
    AdmComponent,
    TranslationlistComponent,
    EditTranslationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environtmet.firebase), // Inicializa AngularFire con la configuración del entorno
    AngularFireAuthModule, // Importa el módulo de autenticación de AngularFire
    MatProgressSpinnerModule,
    MatToolbar,
    MatCard,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
