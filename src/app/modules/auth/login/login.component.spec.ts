import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { SharedModule } from '../../../shared/shared.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.detectChanges();
  });

  it('Debería crearse correctamente.', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar a authService.login al enviar el formulario', () => {
    // se configura los valores del formulario
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');

    // Se simula que el login devuelve un observable vacío (o algo)
    authServiceSpy.login.and.callFake((email: string, pass: string) => {
      return of(true);
    });

    // Se ejecuta el método que hace el login
    component.login();

    // Verificamos que authService.login haya sido llamado con los datos correctos
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', '123456');
  });
});
