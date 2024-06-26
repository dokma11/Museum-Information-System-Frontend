import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Registration, Role } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'xp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('buttonState', [
      state('clicked', style({
        transform: 'scale(0.9)',
        opacity: 0.5
      })),
      transition('* => clicked', [
        animate('200ms')
      ]),
      transition('clicked => idle', [
        animate('200ms')
      ])
    ]),
  ]
})
export class RegistrationComponent {
  isPasswordVisible: boolean;
  isRepeatPasswordVisible: boolean;

  constructor(private authService: AuthService, 
              private router: Router,
              private snackBar: MatSnackBar,) {
    this.isPasswordVisible = false;
    this.isRepeatPasswordVisible = false;
  }

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatpassword: new FormControl('', [Validators.required]),
  });

  buttonState: string = 'idle'; 
  focused: string = '';
  backgroundSize: string = '100% 110%';

  register(): void {
    const registration: Registration = {
      firstName: this.registrationForm.value.firstName || "",
      lastName: this.registrationForm.value.lastName || "",
      email: this.registrationForm.value.email || "",
      username: this.registrationForm.value.username || "",
      password: this.registrationForm.value.password || "",
      role: 0
    };

    console.log(registration);

    if (this.registrationForm.valid) {
      if(this.registrationForm.value.password === this.registrationForm.value.repeatpassword){
        this.buttonState = 'clicked'; 
        setTimeout(() => { this.buttonState = 'idle'; }, 200); 
        this.authService.register(registration).subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: (error) => {
            if (error.error instanceof ErrorEvent) {
                alert('An error occurred: ' + error.error.message);
            } else {
              if (error.status === 400) { 
                const errorMessage: string = error.error.message || "";

                if (errorMessage.includes('email')) {
                    this.showNotification('Email already exists. Please use a different one.');
                } else if (errorMessage.includes('username')) {
                  this.showNotification('Username already exists. Please use a different one.');
                } else {
                  this.showNotification('Email and username already exist. Please try different ones.');
                }
            } else {
              this.showNotification('Server error occurred. Please try again later.');
            }
            }
        }
        });
      } 
      else{
        this.showNotification('Passwords do not match!'); 
      }
    }
    else{
      this.showNotification('Sign up form not valid!');
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleRepeatPasswordVisibility() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'] // Add custom CSS class here

    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;

    const zoom = 100 + scrollPercent * 0.1; 

    this.backgroundSize = `${zoom}% ${zoom+10}%`;
  }

  faEye = faEye;
  faEyeSlash = faEyeSlash;
}