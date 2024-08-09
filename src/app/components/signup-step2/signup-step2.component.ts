import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-signup-step2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.css'],
})
export class SignupStep2Component implements OnInit {
  signupForm: FormGroup;
  designations = ['Developer', 'Manager', 'Analyst'];
  errorMessage: string = '';

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private mockDataService: MockDataService
  ) {
    this.signupForm = this.fb.group({
      identifier: ['', Validators.required],
      organisation: ['', Validators.required],
      organisation_id: ['', Validators.required],
      designation: ['', Validators.required],
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  ngOnInit(): void {
    if (this.isLocalStorageAvailable()) {
      this.loadStep1Data();
    } else {
      console.error('localStorage is not available.');
      this.navigateToStep1();
    }
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }

    const organisationName = this.signupForm.value.organisation;
    this.mockDataService.getOrganizationId(organisationName).subscribe((id) => {
      if (id) {
        this.signupForm.get('organisation_id')?.setValue(id);
        this.errorMessage = '';
        const formData = this.signupForm.value;
        localStorage.setItem('signupStep2', JSON.stringify(formData));
        this.router.navigate(['/success'], { queryParams: { action: 'signup' } });
      } else {
        this.errorMessage = 'Unknown organization-id';
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  private isLocalStorageAvailable(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  private loadStep1Data(): void {
    const step1Data = localStorage.getItem('signupStep1');
    if (step1Data) {
      try {
        const parsedData = JSON.parse(step1Data);
        this.signupForm.patchValue(parsedData);
      } catch (error) {
        console.error('Error parsing step1Data:', error);
        this.navigateToStep1();
      }
    } else {
      this.navigateToStep1();
    }
  }

  private navigateToStep1(): void {
    this.router.navigate(['/signup-step1']);
  }
}
