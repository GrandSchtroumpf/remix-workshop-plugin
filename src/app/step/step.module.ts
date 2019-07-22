import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { StepGuard } from './step.guard';

import { StepViewComponent } from './view/view.component';
import { StepListComponent } from './list/list.component';

@NgModule({
  declarations: [StepViewComponent, StepListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StepListComponent },
      {
        path: ':stepId',
        canActivate: [StepGuard],
        component: StepViewComponent
      },
    ])
  ]
})
export class StepModule { }
