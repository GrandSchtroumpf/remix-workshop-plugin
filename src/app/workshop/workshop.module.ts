import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BootstrapModule } from '../bootstrap.module';
import { BackButtonModule } from '../ui/back-button/back-button.module';
import { StartedWorkshopGuard, ActiveWorkshopGuard, EditWorkshopGuard } from './workshop.guard';

import { WorkshopListComponent } from './list/list.component';
import { WorkshopViewComponent } from './view/view.component';
import { WorkshopFormComponent } from './form/form.component';
import { WorkshopEditComponent } from './edit/edit.component';
import { WorkshopCreateComponent } from './create/create.component';
import { StepFormModule } from '../step/form/form.module';
import { AccountToolbarModule } from '../account/toolbar/toolbar.module';

@NgModule({
  declarations: [
    WorkshopListComponent,
    WorkshopViewComponent,
    WorkshopFormComponent,
    WorkshopEditComponent,
    WorkshopCreateComponent,
  ],
  imports: [
    CommonModule,
    StepFormModule,
    BootstrapModule,
    AccountToolbarModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BackButtonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: WorkshopListComponent },
      { path: 'create', component: WorkshopCreateComponent },
      {
        path: ':workshopId',
        canActivate: [ActiveWorkshopGuard],
        children: [
          { path: '', redirectTo: 'view', pathMatch: 'full' },
          { path: 'view', component: WorkshopViewComponent },
          { path: 'edit', component: WorkshopEditComponent, canActivate: [EditWorkshopGuard] },
          {
            path: 'steps',
            canActivate: [StartedWorkshopGuard],
            loadChildren: () => import('../step/step.module').then(m => m.StepModule)
          }
        ]
      }
    ])
  ]
})
export class WorkshopModule {}
