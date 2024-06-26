import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsCleaningViewComponent } from './items-cleaning-view/items-cleaning-view.component';
import { CleaningProposalFormComponent } from './cleaning-proposal-form/cleaning-proposal-form.component';
import { CleaningHandlingViewComponent } from './cleaning-handling-view/cleaning-handling-view.component';
import { CleaningProposalCardComponent } from './cleaning-proposal-card/cleaning-proposal-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from 'src/app/infrastructure/material/material-module';
import { AcceptCleaningPromptComponent } from './accept-cleaning-prompt/accept-cleaning-prompt.component';
import { DeclineCleaningPromptComponent } from './decline-cleaning-prompt/decline-cleaning-prompt.component';
import { CleaningReportPromptComponent } from './cleaning-report-prompt/cleaning-report-prompt.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';
import { PdfCleaningPromptComponent } from './pdf-cleaning-prompt/pdf-cleaning-prompt.component';
import { PdfPersonalCleaningPromptComponent } from './pdf-personal-cleaning-prompt/pdf-personal-cleaning-prompt.component';
import { CleaningJournalComponent } from './cleaning-journal/cleaning-journal.component';
import { JournalComponent } from './journal/journal.component';



@NgModule({
  declarations: [
    ItemsCleaningViewComponent,
    CleaningProposalFormComponent,
    CleaningHandlingViewComponent,
    CleaningProposalCardComponent,
    AcceptCleaningPromptComponent,
    DeclineCleaningPromptComponent,
    CleaningReportPromptComponent,
    RejectReasonComponent,
    PdfCleaningPromptComponent,
    PdfPersonalCleaningPromptComponent,
    CleaningJournalComponent,
    JournalComponent  
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialModule,
    MatInputModule,
    MatNativeDateModule
  ],
  exports: [
    CleaningProposalCardComponent
  ] 
})
export class CleaningModule { }
