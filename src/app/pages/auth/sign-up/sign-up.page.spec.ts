import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignUpPage } from './sign-up.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { of } from 'rxjs';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let firebaseService: FirebaseService;
  let utilsService: UtilsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpPage],
      imports: [ReactiveFormsModule, IonicModule],
      providers: [
        FirebaseService,
        UtilsService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    firebaseService = TestBed.inject(FirebaseService);
    utilsService = TestBed.inject(UtilsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signUp method', () => {
    const signUpSpy = spyOn(firebaseService, 'signUp').and.returnValue(of({ user: { uid: '123' } }));

    // Simulate user input and trigger signUp method

    expect(signUpSpy).toHaveBeenCalled();
    expect(component.errorMessage).toBeNull();
    expect(component.successMessage).toBe('User signed up successfully');
  });

  it('should display error message on signUp failure', () => {
    const signUpSpy = spyOn(firebaseService, 'signUp').and.returnValue(of({ error: 'Invalid email' }));

    // Simulate user input and trigger signUp method

    expect(signUpSpy).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Invalid email');
    expect(component.successMessage).toBeNull();
  });

});