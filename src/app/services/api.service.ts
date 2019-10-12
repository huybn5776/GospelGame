import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HttpOptions } from '../interface/model/http-options';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  post<R, P = R>(url: string, body?: P | string, options?: HttpOptions<'json'>): Observable<R> {
    return this.httpClient.post<R>(`${API_URL}/${url}`, body, options);
  }

  get<T>(url: string, options?: HttpOptions<'json'>): Observable<T> {
    return this.httpClient.get<T>(`${API_URL}/${url}`, options);
  }

  put<T>(url: string, body?: T, options?: HttpOptions<'json'>): Observable<T> {
    return this.httpClient.put<T>(`${API_URL}/${url}`, body, options);
  }

  patch<R, P = R>(url: string, body?: P | string, options?: HttpOptions<'json'>): Observable<R> {
    return this.httpClient.patch<R>(`${API_URL}/${url}`, body, options);
  }

  delete<T>(url: string, options?: HttpOptions<'json'>): Observable<T> {
    return this.httpClient.delete<T>(`${API_URL}/${url}`, options);
  }
}
