import { ActivatedRoute } from '@angular/router';
import { IRssItem, NewsRss } from './news-rss';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  rssItems : IRssItem[] = new Array();

  constructor(private http: HttpClient,private route: ActivatedRoute, private appComponent: AppComponent, private cryptoService: CryptoService) {
  }

  ngOnInit(): void {
    this.GetRssFeedData();
  }

  GetRssFeedData() {
    var _this = this;
    this.cryptoService.getNews().subscribe({
      next: (data)=>{
        _this.rssItems = data;
      },
      error: (error)=> {
        console.error(error);
        this.appComponent.showErrorMessage("Ocurrio un error al obtener las noticias");
      }
    })
  }

   getDataDiff(endDate: Date) {
    let setDate= new Date(endDate).toISOString();
    var diff = (new Date()).getTime() - new Date(setDate).getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    let dayString =  days == 0 ?  "" : days + "days ";
    let hoursString =  hours == 0 ?  "" : hours + "hr ";
    let minutesString =  minutes == 0 ?  "" : minutes + "m ";

    return dayString + hoursString + minutesString;
  }
}