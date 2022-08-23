import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { ICryptoData } from '../crypto/crypto-data';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  CRYPTO_URL: string = Constants.API_URL + "/crypto/"

  constructor(private httpClient: HttpClient) { }

  getHistory(): Observable<ICryptoData[]> {
    return this.httpClient.get<ICryptoData[]>(this.CRYPTO_URL + "history");
  }

}
