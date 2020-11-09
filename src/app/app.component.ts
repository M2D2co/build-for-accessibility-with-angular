import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { DbService } from './services/db/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  destroyed$: Subject<boolean> = new Subject();
  path: string;
  url: string;

  constructor(
    private db: DbService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.db.initialize();
    this.router.events.pipe(
      takeUntil(this.destroyed$),
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe((event: RouterEvent) => {
      let path = event.url;
      const hash = path.indexOf('#');
      if (hash > -1) { path = path.substr(0, hash); }
      this.path = path;
    });
  }

}
