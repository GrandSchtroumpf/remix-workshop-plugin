import { NgModule } from '@angular/core';
import {
  NgbButtonsModule,
  NgbAlertModule,
  NgbAccordionModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [NgbButtonsModule, NgbAlertModule, NgbAccordionModule],
})
export class BootstrapModule {}
