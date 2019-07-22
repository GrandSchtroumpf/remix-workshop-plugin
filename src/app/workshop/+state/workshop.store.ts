import { Injectable } from '@angular/core';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';
import { Workshop } from './workshop.model';

export interface WorkshopState extends EntityState<Workshop, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workshop' })
export class WorkshopStore extends EntityStore<WorkshopState> {

  constructor() {
    super();
  }

}

