import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { AppComponent } from '../app.component';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {

  data?: Array<Object>;

  title?: string;
  crypto?: string;

  constructor(private route: ActivatedRoute, private appComponent: AppComponent, private cryptoService: CryptoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.setValues(p['crypto']);
      this.loadHistoricalData();
    });
  }

  private setValues(crypto: string) : void {
    this.crypto = crypto;

    switch (crypto) {
      case 'btc':
        this.title = 'Bitcoin'
    }
  }

  private loadHistoricalData(): void {
    this.cryptoService.getHistory().subscribe({
      next: (data) => {
        var maxSeries = new Array;
        var minSeries = new Array;
        data.forEach(function(row) {
          maxSeries.push({
            name: row.date,
            value: row.high
          });
          minSeries.push({
            name: row.date,
            value: row.low
          });
        });
        this.data = [
          {
            name: "Máximo",
            series: maxSeries
          },
          {
            name: "Mínimo",
            series: minSeries
          }
        ]
      },
      error: (error) => {
        console.error(error);
        this.appComponent.showErrorMessage("Ocurrio un error al obtener datos historicos")
      }
    });
  }
  

}
