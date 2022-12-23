import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { ICryptoData } from '../crypto/crypto-data';
import { ICryptoValue } from '../crypto/crypto-value';
import { IRssItem } from '../news/news-rss';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  CRYPTO_URL: string = Constants.API_URL + "crypto/"

  constructor(private httpClient: HttpClient) { }

  getHistory(crypto : string): Observable<ICryptoValue> {
    return this.httpClient.get<ICryptoValue>(this.CRYPTO_URL + "history/" + crypto);
  }

  getNews(): Observable<IRssItem[]> {
    return this.httpClient.get<IRssItem[]>(this.CRYPTO_URL + "news");
  }

}
