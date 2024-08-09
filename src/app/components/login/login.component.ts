import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  identifier: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      identifier: ['', Validators.required],
      password: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.identifier = params['identifier'] || ''; 
      this.loginForm.patchValue({ identifier: this.identifier });
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const { identifier, password } = this.loginForm.value;

    if (this.authService.validatePassword(identifier, password)) {
      this.router.navigate(['/success'], { queryParams: { action: 'login' } });
    } else {
      this.errorMessage = 'Password is not valid';
    }
  }
}
