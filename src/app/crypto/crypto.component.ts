import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatCurrency, formatPercent } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';
import { Router } from 'express';
import { AppComponent } from '../app.component';
import { IChartItem } from '../chart/chart-item';
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
  legend?: string;
  maxHistoricData: Array<IChartItem> = new Array();
  minHistoricData: Array<IChartItem> = new Array();
  maxPredData: Array<IChartItem> = new Array();
  minPredData: Array<IChartItem> = new Array();
  defaultValue: number = 14;

  constructor(@Inject(LOCALE_ID) public locale: string, private route: ActivatedRoute, private appComponent: AppComponent, private cryptoService: CryptoService) { }

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
        this.title = 'Bitcoin';
        break;
      case 'eth':
        this.title = 'Ethereum';
        break;
      case 'ada':
        this.title = 'Cardano';
        break;
      case 'xrp':
        this.title = 'Ripple';
        break;
      case 'sol':
        this.title = 'Solana';
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
        this.appComponent.showErrorMessage("Ocurrio un error al obtener datos historicos");
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
    _this.setVariationLegend(days, selectedMaxHistoricData, selectedMinHistoricData);
  }

  selectAllData() : void {
    var _this = this;
    _this.updateChartValues(_this.maxHistoricData, _this.minHistoricData, _this.maxPredData, _this.minPredData);
    _this.setVariationLegend(1000, _this.maxHistoricData, _this.minHistoricData);
  }

  setVariationLegend(days : number, selectedMaxValues : Array<IChartItem>, selectedMinValues : Array<IChartItem>) : void {
    var max = this.getMaxPrice(selectedMaxValues);
    var min = this.getMinPrice(selectedMinValues);
    var variation = (max - min)/min;
    var text = "";
    var text2 = "precio <b>máximo</b> fue de <b>" + formatCurrency(max,this.locale,'$') + "</b>, el <b>mínimo</b> fue de <b>" + formatCurrency(min,this.locale,'$') + "</b>";
    text2+= " y la <b>variación</b> es de <b>" + formatPercent(variation, this.locale) + "</b>.";
    if (days < 30) {
      text = "En los últimos " + days + " días el ";
    }
    else if (days == 30){
      text = "En el último mes el ";
    }
    else if (days < 365){
      var months = days / 30;
      text = "En los últimos " + months + " meses el ";
    }
    else if (days == 365){
      text = "En el último año el "
    }
    else {
      text = "El "
    }

    this.legend = text + text2;

  }

  getMaxPrice(selectedMaxValues : Array<IChartItem>) : number {
    return Math.max(...selectedMaxValues.map(o => o.value))
    
  }

  getMinPrice(selectedMinValues : Array<IChartItem>) : number {
    return Math.min(...selectedMinValues.map(o => o.value))
  }  
}
