import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthPage } from './auth.page';
import { IonicModule } from '@ionic/angular';

import { AngularFireAuthModule  } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de ajustar la ruta correcta
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';


const firebaseConfig = environment.firebaseConfig;

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPage ],
      imports: [IonicModule.forRoot(),AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule ,],
      providers: [
        FirebaseService
        // Puedes necesitar agregar otros proveedores según tu configuración
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
