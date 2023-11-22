import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddUpdateExpenseComponent } from './add-update-expense.component';

import { IonicModule } from '@ionic/angular';

import { AngularFireAuthModule  } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de ajustar la ruta correcta
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';


const firebaseConfig = environment.firebaseConfig;

describe('AddUpdateExpenseComponent', () => {
  let component: AddUpdateExpenseComponent;
  let fixture: ComponentFixture<AddUpdateExpenseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateExpenseComponent ],
      imports: [IonicModule.forRoot(),AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule ,],
      providers: [
        FirebaseService
        // Puedes necesitar agregar otros proveedores según tu configuración
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
