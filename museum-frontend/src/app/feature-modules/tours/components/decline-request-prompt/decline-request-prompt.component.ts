import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToursService } from '../../tours.service';
import { PersonalTourRequest, PersonalTourRequestStatus } from '../../model/personalTourRequest.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-decline-request-prompt',
  templateUrl: './decline-request-prompt.component.html',
  styleUrls: ['./decline-request-prompt.component.css'],
  animations: [
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
  ],
})
export class DeclineRequestPromptComponent{
  cancelButtonState: string = 'idle';
  declineButtonState: string = 'idle';
  request: PersonalTourRequest | undefined;
  focused: string = '';

  constructor(private toursService: ToursService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<DeclineRequestPromptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.request = data;
  }

  declineRequestForm = new FormGroup({
    explanation: new FormControl('', [Validators.required]),
  });

  declineButtonClicked(){
    this.declineButtonState = 'clicked';
    setTimeout(() => { this.declineButtonState = 'idle'; }, 200);

    this.request!.status = PersonalTourRequestStatus.DECLINED;
    this.request!.denialReason = this.declineRequestForm.value.explanation || undefined;

    this.toursService.updateTourRequest(this.request!).subscribe({
      next: () => {
        this.showNotification('Tour request successfully declined!');
        this.dialogRef.close();
      }
    });
  }

  cancelButtonClicked(){
    this.cancelButtonState = 'clicked';
    setTimeout(() => { this.cancelButtonState = 'idle'; }, 200);
    this.dialogRef.close();
  }

  overviewClicked(){
    this.dialogRef.close();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
