import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this._authService.login(this.username, this.password)
    .subscribe(data => {
      localStorage.setItem('UserToken', data.toString())
      this.router.navigateByUrl('/products')
    })
  }
} 
