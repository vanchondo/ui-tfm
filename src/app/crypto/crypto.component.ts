import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { AppComponent } from '../app.component';
import { CryptoService } from '../services/crypto.service';
import { ICryptoData } from './crypto-data';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {

  data?: Array<Object>;

  title?: string;
  crypto?: string;
  maxHistoricData: Array<Object> = new Array();
  minHistoricData: Array<Object> = new Array();
  maxPredData: Array<Object> = new Array();
  minPredData: Array<Object> = new Array();
  defaultValue: number = 7;

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
        this.title = 'Precio Bitcoin (USD)';
        break;
      case 'eth':
        this.title = 'Precio Ethereum (USD)';
        break;
      case 'ada':
        this.title = 'Precio Cardano (USD)';
        break;
      case 'xrp':
        this.title = 'Precio Ripple (USD)';
        break;
      case 'sol':
        this.title = 'Precio Solana (USD)';
        break;        
    }
  }

  private loadHistoricalData(crypto : string): void {
    var _this = this;
    this.cryptoService.getHistory(crypto).subscribe({
      next: (data) => {
        _this.maxHistoricData = new Array;
        _this.minHistoricData = new Array;
        var history = data.history;
        history.forEach(function(row) {
          _this.maxHistoricData.push({
            name: new Date(row.date),
            value: row.high
          });
          _this.minHistoricData.push({
            name: new Date(row.date),
            value: row.low
          });
        });
        _this.maxPredData = new Array;
        _this.minPredData = new Array;
        var predictions = data.predictions;
        predictions.forEach(function(row) {
          _this.maxPredData.push({
            name: new Date(row.date),
            value: row.high
          });
          _this.minPredData.push({
            name: new Date(row.date),
            value: row.low
          });
        });
        _this.selectLastDays(_this.defaultValue);
      },
      error: (error) => {
        console.error(error);
        this.appComponent.showErrorMessage("Ocurrio un error al obtener datos historicos")
      }
    });
  }
  
  private updateChartValues(selectedMaxHistoricData : Array<Object>, selectedMinHistoricData : Array<Object>, selectedMaxPredData : Array<Object>, selectedMinPredData : Array<Object>) : void {
    this.data = [
      {
        name: "Máximo",
        series: selectedMaxHistoricData
      },
      {
        name: "Mínimo",
        series: selectedMinHistoricData
      },
      {
        name: "Predicción - Máximo",
        series: selectedMaxPredData
      },
      {
        name: "Predicción - Mínimo",
        series: selectedMinPredData
      }
    ];
  }


  selectLastDays(days : number) : void { 
    var _this = this;
    var selectedLastDays = days + 1;
    var selectedMaxHistoricData = Array();
    var selectedMinHistoricData = Array();
    if (_this.maxHistoricData.length < days){
      days = _this.maxHistoricData.length;
    }
    for (var i = _this.maxHistoricData.length - 1; i >=  _this.maxHistoricData.length - selectedLastDays; i--) {
      selectedMaxHistoricData.push(_this.maxHistoricData[i]);
      selectedMinHistoricData.push(_this.minHistoricData[i]);
    }
    _this.updateChartValues(selectedMaxHistoricData, selectedMinHistoricData, _this.maxPredData, _this.minPredData);
  }

  selectAllData() : void {
    var _this = this;
    _this.updateChartValues(_this.maxHistoricData, _this.minHistoricData, _this.maxPredData, _this.minPredData);
  }
}
