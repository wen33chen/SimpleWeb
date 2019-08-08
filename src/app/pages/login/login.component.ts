import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMsg: string;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.errorMsg = '';
    this.http
      .get<string>(`/api/v1/SsoEndPoint?userId=${this.username}&token=token`)
      .pipe(
        tap(result => {
          this.authService.setToken(result);
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }
}
