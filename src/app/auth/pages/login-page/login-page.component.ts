import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder)
  private AuthService = inject(AuthService)

  public myform: FormGroup = this.fb.group({
    email: ['Frandser@google.com', [Validators.required, Validators.email]],
    password: ['1234567890', [Validators.required, Validators.minLength(6)]],
  })

  login() {

    const { email, password } = this.myform.value

    this.AuthService.login(email, password)
      .subscribe({
        next: () => console.log('Todo bien'),
        error: (message) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }
}
