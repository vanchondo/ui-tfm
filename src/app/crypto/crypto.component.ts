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
      this.loadHistoricalData(p['crypto']);
    });
  }

  private setValues(crypto: string) : void {
    this.crypto = crypto;

    switch (crypto) {
      case 'btc':
        this.title = 'Bitcoin'
    }
  }

  private loadHistoricalData(crypto : string): void {
    this.cryptoService.getHistory(crypto).subscribe({
      next: (data) => {
        var maxSeries = new Array;
        var minSeries = new Array;
        var history = data.history;
        history.forEach(function(row) {
          maxSeries.push({
            name: new Date(row.date),
            value: row.high
          });
          minSeries.push({
            name: new Date(row.date),
            value: row.low
          });
        });
        var predictionMaxSeries = new Array;
        var predictionMinSeries = new Array;
        var predictions = data.predictions;
        predictions.forEach(function(row) {
          predictionMaxSeries.push({
            name: new Date(row.date),
            value: row.high
          });
          predictionMinSeries.push({
            name: new Date(row.date),
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
          },
          {
            name: "Predicción - Máximo",
            series: predictionMaxSeries
          },
          {
            name: "Predicción - Mínimo",
            series: predictionMinSeries
          }
        ];
      },
      error: (error) => {
        console.error(error);
        this.appComponent.showErrorMessage("Ocurrio un error al obtener datos historicos")
      }
    });
  }  

}
