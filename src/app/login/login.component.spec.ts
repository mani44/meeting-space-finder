import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;  
  let router: Router;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [FormBuilder, Router],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);  
    router = TestBed.inject(Router);  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the loginForm with the correct form controls', () => {  
    expect(component.loginForm).toBeInstanceOf(FormGroup);  
    expect(component.loginForm.controls['username']).toBeDefined();  
    expect(component.loginForm.controls['password']).toBeDefined();  
    expect(component.loginForm.controls['username'].validator).toBe(Validators.required);  
    expect(component.loginForm.controls['password'].validator).toBeInstanceOf(Function);  
  });  
  
  it('should return null for a valid password', () => {  
    const passwordControl = { value: 'Password123' };  
  
    const result = component.passwordValidator(passwordControl);  
  
    expect(result).toBeNull();  
  });  
  
  it('should return an error object for an invalid password', () => {  
    const passwordControl = { value: 'InvalidPassword' };  
  
    const result = component.passwordValidator(passwordControl);  
  
    expect(result).toEqual({ invalidPassword: true });  
  });  
  
  it('should navigate to the dashboard on successful form submission', () => {  
    const navigateSpy = spyOn(router, 'navigate');  
    component.loginForm = formBuilder.group({  
      username: ['Mani', Validators.required],  
      password: ['Password123', Validators.required],  
    });  
  
    component.onSubmit();  
  
    expect(component.loginForm.valid).toBeTrue();  
    expect(component.username).toBe('Mani');  
    expect(localStorage.getItem('username')).toBe('Mani');  
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);  
  });  
  
  it('should mark all form controls as touched on form submission failure', () => {  
    component.loginForm = formBuilder.group({  
      username: ['', Validators.required],  
      password: ['', Validators.required],  
    });  
  
    component.onSubmit();  
  
    expect(component.loginForm.valid).toBeFalse();  
    expect(component.loginForm.controls['username'].touched).toBeTrue();  
    expect(component.loginForm.controls['password'].touched).toBeTrue();  
  });  
});
