import { NgModule } from '@angular/core';
import {
  NgbButtonsModule,
  NgbAlertModule,
  NgbAccordionModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [NgbButtonsModule, NgbAlertModule, NgbAccordionModule, NgbPopoverModule],
})
export class BootstrapModule {}
