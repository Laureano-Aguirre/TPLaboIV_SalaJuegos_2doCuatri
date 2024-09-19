import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { PuntuacionComponent } from './componentes/puntuacion/puntuacion.component';
import { MensajeriaComponent } from './componentes/mensajeria/mensajeria.component';
import RegisterComponent from './componentes/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'puntuacion', component: PuntuacionComponent },
  { path: 'mensajeria', component: MensajeriaComponent },
  { path: 'register', component: RegisterComponent },
];
