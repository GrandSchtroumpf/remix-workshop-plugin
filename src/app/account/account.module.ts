import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonModule } from '../ui/back-button/back-button.module';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  exports: [],
  imports: [
    CommonModule,
    BackButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'profile' },
      { path: 'profile', component: ProfileComponent }
    ])
  ]
})
export class AccountModule { }
