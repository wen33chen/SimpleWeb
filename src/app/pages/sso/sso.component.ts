import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/core/services/auth.service';
import { map, tap, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'app-sso',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.scss']
})
export class SsoComponent implements OnInit {
  errorMsg = 'Wait for SSO Login...';
  constructor(private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.autoLogin();
  }

  autoLogin() {
    const { UserID, Token } = this.route.snapshot.queryParams;

    this.http
      .get<string>(`/api/v1.0/SsoEndPoint?userId=${UserID}&token=${Token}`)
      .pipe(
        map(result => this.authService.setToken(result)),
        tap(_ => this.router.navigate(['/'])),

        catchError(error => {
          this.errorMsg = 'Login fail:' + error;
          return empty();
        })
      )
      .subscribe();
  }

}
