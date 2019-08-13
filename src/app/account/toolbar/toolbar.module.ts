import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbToastModule],
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent]
})
export class AccountToolbarModule {}
