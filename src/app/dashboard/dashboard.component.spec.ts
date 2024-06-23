import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [Router],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve username from local storage and navigate to login page if not found', () => {  
    const navigateSpy = spyOn(router, 'navigate');  
    const localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.returnValue(null);  
  
    component.ngOnInit();  
  
    expect(localStorageGetItemSpy).toHaveBeenCalledWith('username');  
    expect(navigateSpy).toHaveBeenCalledWith(['/']);  
  });  
  
  it('should retrieve username from local storage and not navigate if found', () => {  
    const navigateSpy = spyOn(router, 'navigate');  
    const localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.returnValue('Mani');  
  
    component.ngOnInit();  
  
    expect(localStorageGetItemSpy).toHaveBeenCalledWith('username');  
    expect(navigateSpy).not.toHaveBeenCalled();  
    expect(component.username).toBe('Mani');  
  });  
  
  it('should clear local storage and navigate to login page on logout', () => {  
    const navigateSpy = spyOn(router, 'navigate');  
    const localStorageRemoveItemSpy = spyOn(localStorage, 'removeItem');  
  
    component.logout();  
  
    expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('username');  
    expect(navigateSpy).toHaveBeenCalledWith(['/']);  
  });
});
