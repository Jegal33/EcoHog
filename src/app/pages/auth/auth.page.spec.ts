import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthPage } from './auth.page';


describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let firebaseServiceMock: jasmine.SpyObj<FirebaseService>;
  let utilsServiceMock: jasmine.SpyObj<UtilsService>;

  beforeEach(waitForAsync(() => {
    const firebaseSpy = jasmine.createSpyObj('FirebaseService', ['signIn', 'getUserInfo']);
    const utilsSpy = jasmine.createSpyObj('UtilsService', ['loading', 'presentToast']);

    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: FirebaseService, useValue: firebaseSpy },
        { provide: UtilsService, useValue: utilsSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    firebaseServiceMock = TestBed.inject(FirebaseService) as jasmine.SpyObj<FirebaseService>;
    utilsServiceMock = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signIn method and getUserInfo method on submit', async () => {
    const mockUser = { email: 'test@example.com', password: 'password' };
    const mockUserInfo = { uid: 'testUid', name: 'Test User' };

    firebaseServiceMock.signIn.and.returnValue(Promise.resolve({ user: { uid: 'testUid' } }));
    firebaseServiceMock.getUserInfo.and.returnValue(Promise.resolve(mockUserInfo));
    utilsServiceMock.loading.and.returnValue(Promise.resolve({ present: () => {}, dismiss: () => {} }));

    component.form.setValue(mockUser);
    await component.submit();

    expect(firebaseServiceMock.signIn).toHaveBeenCalledWith(mockUser);
    expect(firebaseServiceMock.getUserInfo).toHaveBeenCalledWith('testUid');
    expect(utilsServiceMock.loading).toHaveBeenCalled();
    expect(utilsServiceMock.presentToast).not.toHaveBeenCalled();
  });

  it('should show error toast when signIn fails', async () => {
    const mockUser = { email: 'test@example.com', password: 'password' };

    firebaseServiceMock.signIn.and.returnValue(Promise.reject('Sign in failed'));
    utilsServiceMock.loading.and.returnValue(Promise.resolve({ present: () => {}, dismiss: () => {} }));

    component.form.setValue(mockUser);
    await component.submit();

    expect(firebaseServiceMock.signIn).toHaveBeenCalledWith(mockUser);
    expect(utilsServiceMock.loading).toHaveBeenCalled();
    expect(utilsServiceMock.presentToast).toHaveBeenCalledWith('Sign in failed', 'danger');
  });

  it('should show error toast when getUserInfo fails', async () => {
    const mockUser = { email: 'test@example.com', password: 'password' };

    firebaseServiceMock.signIn.and.returnValue(Promise.resolve({ user: { uid: 'testUid' } }));
    firebaseServiceMock.getUserInfo.and.returnValue(Promise.reject('Get user info failed'));
    utilsServiceMock.loading.and.returnValue(Promise.resolve({ present: () => {}, dismiss: () => {} }));

    component.form.setValue(mockUser);
    await component.submit();

    expect(firebaseServiceMock.signIn).toHaveBeenCalledWith(mockUser);
    expect(firebaseServiceMock.getUserInfo).toHaveBeenCalledWith('testUid');
    expect(utilsServiceMock.loading).toHaveBeenCalled();
    expect(utilsServiceMock.presentToast).toHaveBeenCalledWith('Get user info failed', 'danger');
  });
});