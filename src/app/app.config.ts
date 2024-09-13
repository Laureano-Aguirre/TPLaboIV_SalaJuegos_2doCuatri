import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"tpjuegoshosting","appId":"1:563902709617:web:1810fb3f2bb11b845780d0","storageBucket":"tpjuegoshosting.appspot.com","apiKey":"AIzaSyDI1PJgtwc-ANEIiIgJ-wJBVctONzWRGe0","authDomain":"tpjuegoshosting.firebaseapp.com","messagingSenderId":"563902709617"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideAnimationsAsync(), provideAnimationsAsync()]
};
