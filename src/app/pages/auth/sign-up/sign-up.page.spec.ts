import { ComponentFixture, TestBed, waitForAsync  } from '@angular/core/testing';

import { SignUpPage } from './sign-up.page';
import { IonicModule } from '@ionic/angular';

import { AngularFireAuthModule  } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de ajustar la ruta correcta
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';


const firebaseConfig = environment.firebaseConfig;

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpPage ],
      imports: [IonicModule.forRoot(),AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule ,],
      providers: [
        FirebaseService
        // Puedes necesitar agregar otros proveedores según tu configuración
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
