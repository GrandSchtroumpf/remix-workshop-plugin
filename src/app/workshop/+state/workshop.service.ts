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

  // private gist(id: string) {
  //   return this.http.get<Gist>(`https://api.github.com/gists/${id}`);
  // }

  // getAll() {
  //   const req = (id: string): Observable<Workshop> => {
  //     return this.gist(id).pipe(
  //       map((data: any) => ({id, ...data.files['metadata.json']})),
  //       switchMap((metadataFile: any) => {
  //         const metadata = JSON.parse(metadataFile.content);
  //         const stepReqs = metadata.stepIds.map(stepId => {
  //           return this.gist(stepId).pipe(map(data => gistToStep(data)));
  //         });
  //         return combineLatest(stepReqs).pipe(
  //           map(steps => ({ ...metadata, steps, id } as Workshop))
  //         );
  //       })
  //     );
  //   };
  //   return combineLatest(GIST.map(req)).pipe(
  //     tap(workshops => this.store.add(workshops))
  //   );
  // }

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
