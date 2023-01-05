import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesServiceService {
  constructor(private http: HttpClient) { }

  getCountries(): Observable<any>{
    var url = `http://localhost:3000/download`;
    var object={ "otherActor":["USA","AUS"], "cameoCode":["043"], "location":[] };
    var body = { "fields":object};
    return this.http.post(url, body, {responseType: "blob"});
  }
}
