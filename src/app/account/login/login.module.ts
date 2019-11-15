import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbToastModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {}
