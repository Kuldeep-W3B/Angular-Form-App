import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  entryForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.entryForm = this.fb.group({
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit() {
    const { email, phone } = this.entryForm.value;
    const identifier = email || phone;

    if (identifier && this.authService.userExists(identifier)) {
      this.router.navigate(['/login'], { queryParams: { identifier } });
    } else if (identifier) {
      this.router.navigate(['/signup-step1'], { queryParams: { identifier } });
    } else {
      console.error('No email or phone number provided');
    }
  }
}
