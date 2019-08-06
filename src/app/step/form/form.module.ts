import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StepFormComponent } from './form.component';

@NgModule({
  declarations: [StepFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [StepFormComponent]
})
export class StepFormModule {}
