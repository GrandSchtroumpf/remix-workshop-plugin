import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkshopStore } from './workshop.store';
import { Workshop } from './workshop.model';
import { guid } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class WorkshopService {

  constructor(
    private http: HttpClient,
    private store: WorkshopStore,
  ) {}

  async get(id: string) {
    this.store.setActive(id);
    return true;  // to change with 3box
  }

  update(workshop: Workshop) {
    this.store.update(workshop.id, workshop);
  }

  create(workshop: Workshop) {
    if (!workshop.id) {
      workshop.id = guid();
    }
    return this.store.add(workshop);
  }
}
