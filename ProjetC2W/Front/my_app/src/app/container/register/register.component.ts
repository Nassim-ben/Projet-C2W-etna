import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  username: string = ''
  password: string =''

  constructor(
    private _authService : AuthService,    
    private router: Router
) 
{
    
  }

  ngOnInit(): void {

  }
   
  register() {
    this._authService.register(this.username, this.password, 0)
    .subscribe(() => {
      this.router.navigateByUrl('/products')
    })
  }

}
