import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService {

  private rootURL = 'https://www.instagram.com/';

  constructor(private http: HttpClient) { }

  getMediaByTag (query: string): Observable<any> {
    const url = this.rootURL + 'explore/tags/' + query + '/';
    return this.http.get( url, { responseType: 'text' });
  }

  getJJCommunityThemeOfTheDay (): Observable<any> {
    const url = this.rootURL + 'jjcommunity/';
    return this.http.get( url, { responseType: 'text' });
  }

  getGOTDThemeOfTheDay (): Observable<any> {
    const url = this.rootURL + 'gramoftheday/';
    return this.http.get( url, { responseType: 'text' });
  }
}
