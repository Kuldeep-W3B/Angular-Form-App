import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-step1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-step1.component.html',
  styleUrls: ['./signup-step1.component.css']
})
export class SignupStep1Component implements OnInit {
  signupForm: FormGroup;
  identifier: string = ''; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      identifier: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.identifier = params['identifier'] || ''; 
      this.signupForm.patchValue({ identifier: this.identifier });
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = this.signupForm.value;
    localStorage.setItem('signupStep1', JSON.stringify(formData));
    this.router.navigate(['/signup-step2']);
  }
}
