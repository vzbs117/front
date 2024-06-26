import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { UserComponent } from './components/user/user.component';
import { AdmComponent } from './components/adm/adm.component';
import { TranslationlistComponent } from './components/translationlist/translationlist.component';
import { EditTranslationComponent } from './components/edit-translation/edit-translation.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'translator',component:TranslatorComponent},
  {path:'user',component:UserComponent},
  {path:'adm',component:AdmComponent},
  {path:'translations',component:TranslationlistComponent},
  {path:'translations/edit/:id',component:EditTranslationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
