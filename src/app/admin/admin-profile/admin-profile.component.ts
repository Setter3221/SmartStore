// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-profile',
//   standalone: true,
//   imports: [],
//   templateUrl: './admin-profile.component.html',
//   styleUrl: './admin-profile.component.css'
// })
// export class AdminProfileComponent {

// }

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-profile.component.html',
  styleUrl:  './admin-profile.component.css'
})
export class AdminProfileComponent {
 
  constructor(private router: Router) { }
 
  onClickGetInfo(infoType: string) {
    //let url = `/admin/${infoType}`;
    this.router.navigate([`/admin/customers/${infoType}`]);
    //this.router.navigateByUrl(url);
  }
 
}