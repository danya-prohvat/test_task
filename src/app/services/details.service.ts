import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacteristics, IDetails } from '../types/details.types';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://order3-api-dev.utr.ua:5455/api/'

  search(desiredDetail: string): Observable<{ details: IDetails }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ details: IDetails }>(
      `${this.baseUrl}search/${desiredDetail}`,
      { headers: headers },
    );
  }

  searchAnalogs(
    displayBrand: string | undefined,
    article: string | undefined,
  ): Observable<IDetails> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IDetails>(
      `${this.baseUrl}analogs/${displayBrand}/${article}`,
      { headers: headers },
    );
  }

  getCharacteristics(id: number | null): Observable<ICharacteristics> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<ICharacteristics>(
      `http://order3-api-dev.utr.ua:5455/catalog/details/${id}/characteristics`,
      { headers: headers },
    );
  }
}
