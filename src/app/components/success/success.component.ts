import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  message: string = '';
  secondMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const action = params['action'];
      if (action === 'login') {
        this.message = 'Logging you in.....';
          this.secondMessage = 'Kindly wait as we are curating the data accordingly';
      } else if (action === 'signup') {
        this.message = 'Welcome to Solvei8!';
          this.secondMessage = 'Redirecting you to the Login screen. This might take a few seconds';
          setTimeout(() => {
            this.router.navigate(['/login']); 
          }, 5000); 
      }
    });
  }
}
