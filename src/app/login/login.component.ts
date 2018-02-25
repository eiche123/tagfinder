import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // default welcome text
  mainText = 'Login in to your Instagram Account,';
  subText = 'so we can find the best #hashtags for you.';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.hasAuthenticationError()) {
      // text in case of an authentication error: ask for permissions explicitly
      this.mainText = 'Please login in your Instagram account and grant tagfinder access.';
      this.subText = 'We will neither post nor access your images, only search for the best #hashtags.';
    }
  }

  login() {
    window.location.href = 'https://www.instagram.com/oauth/authorize/?client_id=ad2fefc30670423798ee89e3d8bc517e&'
       + 'redirect_uri=http://localhost:4200/callback&response_type=token&scope=public_content';
  }

}
