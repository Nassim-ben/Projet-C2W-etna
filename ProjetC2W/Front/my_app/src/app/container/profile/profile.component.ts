import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/Address';
import { User, UserRole } from 'src/app/model/User';
import { UserService } from 'src/app/service/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user: User = {username: '', role: 0, email: '',address:'' /*birthday*/ }
  address: Address[] = []
  constructor(
    private _userService: UserService
  ) { }
 

  ngOnInit(): void {
    this._userService.getUserInfo()
    .subscribe(data => {
      this.user = data
      if(data.role === UserRole.ROLE_ADMIN)
        this.user.role = 1
        else
        this.user.role = 0
    })
    this._userService.getAddress()
    .subscribe(data => {
      this.address = data
    })

  }

}
