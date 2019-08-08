import { Component, OnInit } from '@angular/core';
import { Workshop, WorkshopQuery, WorkshopService } from 'src/app/workshop/+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public workshops$: Observable<Workshop[]>;

  constructor(
    private service: WorkshopService,
    private query: WorkshopQuery
  ) { }

  ngOnInit() {
    this.service.getOwned();
    this.workshops$ = this.query.owned$;
  }

}
