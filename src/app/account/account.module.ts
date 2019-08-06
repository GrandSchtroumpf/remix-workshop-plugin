import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SigninComponent, ToolbarComponent, ProfileComponent],
  exports: [SigninComponent, ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'profile' },
      { path: 'profile', component: ProfileComponent }
    ])
  ]
})
export class AccountModule { }
