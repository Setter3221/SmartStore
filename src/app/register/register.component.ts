import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent  {

registerForm!: FormGroup;
 
  constructor(private router: Router, private productsrv: ProductService) { }

ngOnInit() {

  this.registerForm = new FormGroup({
    'Name': new FormControl(null, Validators.required),
    'Email': new FormControl(null, [Validators.required, Validators.email]),
    'Password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    'ConfirmPassword': new FormControl(null, [Validators.required, this.matchPassword.bind(this)]),
    'PhoneNumber': new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    'Address': new FormControl(null, Validators.required),
    'Role': new FormControl('Customer')
  });
}

matchPassword(control: FormControl): {[s: string]: boolean} | null {
  if (this.registerForm && control.value !== this.registerForm.controls['Password'].value) {
    return {'passwordsNotMatch': true};
  }
  return null;
}


onRegister() {
  if (this.registerForm.valid) {
    this.productsrv.registerUser(this.registerForm.value).subscribe(
      (res:any)=>{
        alert('Registered Successfully');
        this.router.navigate(['/login']);
      },
      (error:any)=>{
        alert('Please Provide Valid details');
      }
    );
  }
   else {
     alert('Please Provide Valid Credentials');
   }
}

}

