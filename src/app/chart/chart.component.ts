import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input()
  data? : Array<Object>;

  view: [number, number] = [1200, 800];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Precio (USD)';
  timeline: boolean = false;
  autoScale: boolean = true;
  gradient: boolean = false;

  colorScheme : Color = {
    domain: ['#5AA454', '#E44D25', '#3374FF', '#FF33F6'],
    name: '',
    selectable: false,
    group: ScaleType.Linear
  };
  constructor() { 
    this.view = [innerWidth / 1.8, innerWidth / 3.3];
  }

  ngOnInit(): void {
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onResize(event: any) {
    this.view = [innerWidth / 1.8, innerWidth / 3.3];
  }

  formatPrice(valueString: string) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    var value: number = +valueString;
    return formatter.format(value);
  }

}
