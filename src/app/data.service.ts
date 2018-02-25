import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService {

  private rootURL = 'https://api.instagram.com/v1/tags/';

  constructor(private http: HttpClient) { }

  getMediaByTag (query: string): Observable<any> {

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get( 'https://www.instagram.com/explore/tags/' + query + '/', { headers : headers, responseType: 'text' });
  }
}
