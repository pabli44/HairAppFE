import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('UserService', ['getUserByEmail']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule, ToastrModule.forRoot()],
      declarations: [LoginComponent],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loginForm defined', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should have title "Login Page"', () => {
    expect(component.title).toEqual('Login Page');
  });

  it('should have isData initial as false', () => {
    expect(component.isData).toBeFalse();
  });

  it('should have showPassword initial as false', () => {
    expect(component.showPassword).toBeFalse();
  });

  it('should have isSubmitting initial as false', () => {
    expect(component.isSubmitting).toBeFalse();
  });

  it('loginForm should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('loginForm should be valid with correct data', () => {
    component.loginForm.get('email').setValue('test@test.com');
    component.loginForm.get('password').setValue('password');
    component.loginForm.get('profile').setValue('1');
    expect(component.loginForm.valid).toBeTruthy();
  });
});