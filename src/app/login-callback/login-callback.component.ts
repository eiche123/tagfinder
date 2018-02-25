import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.css']
})
export class LoginCallbackComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

    const url = this.activatedRoute.snapshot;

    // Instagram API provided an access token as URL fragment
    if (url.fragment != null && url.fragment.startsWith('access_token=')) {
      const test = url.fragment.split('?')[ 1 ];
      const accessToken = url.fragment.split('=')[ 1 ];
      this.authService.updateToken(accessToken);
      this.router.navigateByUrl('');
    }

    // access denied by Instagram API
    if (url.queryParamMap != null && url.queryParamMap.get('error') === 'access_denied') {
      this.authService.setAuthenticationError();
      this.router.navigateByUrl('/login');
    }

    // in case somebody navigate to /callback*, automatically forward to home
    this.router.navigateByUrl('');
  }

}
