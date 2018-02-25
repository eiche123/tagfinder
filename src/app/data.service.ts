import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Tag } from './tag';


@Injectable()
export class DataService {

  private rootURL = 'https://api.instagram.com/v1/tags/';

  constructor(private http: HttpClient) { }

  getTagInfo (tagName: string): Observable<Tag> {
     return this.http.get<Tag>(this.rootURL + tagName);
  }

  getTags (query: string): Observable<Tag[]> {
    return this.http.get<Tag[]>( this.rootURL + 'search?q=' + query);
  }

  getMediaByTag (query: string): Observable<any> {

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get( 'https://www.instagram.com/explore/tags/' + query + '/', { headers : headers, responseType: 'text' });
  }
}
