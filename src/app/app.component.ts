import {Component, OnDestroy, OnInit} from '@angular/core';
import {isAuthenticated} from './shared/helpers';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


  title = 'Wallet App';
  isAuthenticated: boolean;
  private checkingInterval = null;

  constructor(
    private router: Router,
    private authService: AuthService) {

  }

  public ngOnInit(): void {
    this.isAuthenticated = isAuthenticated();
    this.checkingLoginStatus();
  }

  checkingLoginStatus() {
    this.checkingInterval = setInterval(() => {
      this.isAuthenticated = isAuthenticated();
    }, 300);
  }

  ngOnDestroy(): void {
    clearInterval(this.checkingInterval);
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      this.isAuthenticated = false;
      this.router.navigate(['']);
    });
  }

}
