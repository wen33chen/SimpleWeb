import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from 'app/pages/menu/services/menu.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private menuService: MenuService, private router: Router) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url)
      )
      .subscribe(this.menuService.currentPath$);
  }
}
