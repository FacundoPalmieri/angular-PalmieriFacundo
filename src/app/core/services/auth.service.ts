import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/index';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*
  ----------------------------------------------------------------------------------------
  Manejo de Roles y permisos
  ----------------------------------------------------------------------------------------
  */

  // BehaviorSubject guarda el último valor emitido (incluso si no hay suscriptores en el momento).
  // Se utiliza para mantener el estado actual del usuario autenticado en toda la aplicación.
  private _authUser$ = new BehaviorSubject<User | null>(null);


  // Observable público para que otros componentes puedan reaccionar cuando el usuario cambia.
  // Por ejemplo, para mostrar u ocultar botones según el rol del usuario logueado.
  authUser$: Observable<User | null> = this._authUser$.asObservable();


  constructor(private http: HttpClient, private router: Router) { }



  /*
  ----------------------------------------------------------------------------------------
  Manej de la autenticación de los usuarios
  1. Login: Se encarga de autenticar al usuario y almacenar el token en el localStorage.
  ----------------------------------------------------------------------------------------
  */

  login(email: string, password: string): void {
    this.http
      .get<User[]>(`http://localhost:3000/users?email=${email}&password=${password}`)
      .subscribe({
        next: (response) => {

          const user = response[0];
          if (user) {
            localStorage.setItem('token', user.token);
            this.router.navigate(['/dashboard']);
            this._authUser$.next(user);
          }
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }

      })
  }

  verifyToken(): Observable<User | boolean> {
    const storedToken = localStorage.getItem('token');
    return this.http
      .get<User[]>(`http://localhost:3000/users?token=${storedToken}`)
      .pipe(
        map((response) => {
          const user = response[0];
          if (user) {
            localStorage.setItem('token', user.token);
            this._authUser$.next(user);
            return user;
          } else {
            this.router.navigate(['/auth']);
            return false;
          }

        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._authUser$.next(null);
  }
}
