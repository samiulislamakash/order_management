import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomarService {

  EndPoint = environment.API_ENDPOINT + `customar/`

  constructor(private http: HttpClient) { }

  filter(
    option: {
      take?: any;
      page?: any;
      searchTerm?: any;
    } = {}
  ) {
    return this.http.get(
      `${this.EndPoint}all?take=${option.take || ''}&page=${option.page || ''}&searchTerm=${option.searchTerm || ''}`
    );
  }

  getById(id: string) {
    return this.http.get(`${this.EndPoint}${id}`);
  }

  create(payload: any): Observable<any> {
    return this.http.post(`${this.EndPoint}create`, payload);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.EndPoint + id);
  }

  update(id: string, payload: any): Observable<any> {
    return this.http.put(this.EndPoint + id, payload);
  }

}
