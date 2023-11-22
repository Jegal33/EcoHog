import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFireAuthModule  } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de ajustar la ruta correcta
import { AddUpdateIncomeComponent } from './add-update-income.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';


const firebaseConfig = environment.firebaseConfig;

describe('AddUpdateIncomeComponent', () => {
  let component: AddUpdateIncomeComponent;
  let fixture: ComponentFixture<AddUpdateIncomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateIncomeComponent ],
      imports: [IonicModule.forRoot(),AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule ,],
      providers: [
        FirebaseService
        // Puedes necesitar agregar otros proveedores según tu configuración
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
