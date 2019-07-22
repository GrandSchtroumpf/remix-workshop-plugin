import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [SigninComponent, ToolbarComponent],
  exports: [SigninComponent, ToolbarComponent],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
