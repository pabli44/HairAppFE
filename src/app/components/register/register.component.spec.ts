import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register.component';
import { UserService } from '../../services/user.service';
import { AdressService } from 'src/app/services/adress.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let adressServiceSpy: jasmine.SpyObj<AdressService>;

  beforeEach(waitForAsync(() => {
    const userSpy = jasmine.createSpyObj('UserService', ['getUserByEmail', 'saveUser']);
    const adressSpy = jasmine.createSpyObj('AdressService', ['saveAdress']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule, ToastrModule.forRoot()],
      declarations: [RegisterComponent],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: AdressService, useValue: adressSpy }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    adressServiceSpy = TestBed.inject(AdressService) as jasmine.SpyObj<AdressService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have registerForm defined', () => {
    expect(component.registerForm).toBeTruthy();
  });

  it('should have title "Register Page"', () => {
    expect(component.title).toEqual('Register Page');
  });

  it('should have isSubmitting initial as false', () => {
    expect(component.isSubmitting).toBeFalse();
  });

  it('should have showPassword initial as false', () => {
    expect(component.showPassword).toBeFalse();
  });

  it('registerForm should be invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('registerForm should have 8 controls', () => {
    expect(Object.keys(component.registerForm.controls).length).toEqual(8);
  });

  it('changeProfile should update profileId', () => {
    const event = { target: { value: '1' } } as any;
    component.changeProfile(event);
    expect(component.profileId).toEqual('1');
  });
});