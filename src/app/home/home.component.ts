import { Component, OnInit }     from '@angular/core';
import { StatisticsService }     from './statistics.service'
import { Order, StorageViewComponent } from '../Classes/order' 
import { Customer }              from '../Classes/Customer' 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ StatisticsService ]
})
export class HomeComponent implements OnInit {
  private orders: Order[];

  // linechart
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = false;
  public lineChartOptions:any = {
     responsive: true
  };
  public lineChartMonths:number = 8;
  public lineChartData:Array<any> = [[0, 0, 0, 0, 0, 0, 0, 0]];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // barchart
  public barChartType:string = 'bar';
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // barchart - orders
  public barChartData:any[] = [
    {data: [0,0,0,0,0,0,0,0,0,0], label: 'Series A'},
  ];
  public barChartLabels:Array<any> = ['NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN'];
  public barChartCustomers:number = 10;

  // barchart - components
  public componentsChartData:any[] = [
    {data: [0,0,0,0,0,0,0,0,0,0], label: 'Series A'},
  ];
  public componentsChartLabels:Array<any> = ['NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN','NaN'];
  public barChartComponents:number = 10;
  
  // Pie
  public pieChartLabels:string[] = ['Open', 'Prepared', 'Tested'];
  public pieChartData:number[] = [0, 0, 0];
  public pieChartType:string = 'pie';


  constructor(private orderService: StatisticsService) { 
    this.getOrders();

  }

  ngOnInit() {
    this.lineChartLabels = this.sliceToMonthsBack(this.lineChartLabels);
    this.lineChartLabels.reverse();
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  getOrders() {
    this.orderService.getOrders(this.lineChartMonths).subscribe(
      orders => {
        this.orders = orders;
        this.generateOrdersLineChart();
        this.generateOrdersBarChart();
        this.generateComponentsBarChart();
        this.generateOrderStatusPieChart();
      });
  }
  
  private generateComponentsBarChart() {
    var data = new Array<number>();
    var labels = new Array<any>();
    for(var i = 0; i < this.barChartComponents; i++) {
      data.push(0);
      labels.push('Unknown');
    }

    var components = new Array<StorageViewComponent>();
    this.orders.forEach(order => {
      order.components.forEach(component => {
        this.getComponentsRecursively(components, component);
      });
    });

    var componentTypesCount : { [key:string]:number; } = {};
      components.forEach(component => {
        if (component.type in componentTypesCount) {
          componentTypesCount[component.type] += 1;
        } else {
          componentTypesCount[component.type] = 1;
        }
    });

    var keys = []; for(var key in componentTypesCount) keys.push(key);
    keys.sort(function(a,b){return componentTypesCount[a]-componentTypesCount[b]});


    var i = 0;
    keys.forEach(element => {
      if (i < data.length) {
        data[i] = componentTypesCount[element];
        labels[i] = element;
      }
      i++;
    });

    if (labels.length > keys.length) {
      labels = labels.slice(0, keys.length)
    }

    this.componentsChartLabels = labels;
    this.componentsChartData = [{data: data, label: 'Series A'}];

    // This fixes a bug with the bar chart labels not swapping out properly
    setTimeout(() => this.componentsChartLabels = this.componentsChartLabels.slice(), 0);

  }

  private generateOrderStatusPieChart() {
    this.pieChartData[0] = 0;
    this.pieChartData[1] = 0;
    this.pieChartData[2] = 0;
    this.orders.forEach(order => {
      if (order.status.toUpperCase() == "OPEN") {
        this.pieChartData[0] += 1; 
      } else if (order.status.toUpperCase() == "PREPARED") {
        this.pieChartData[1] += 1; 
      } else if (order.status.toUpperCase() == "TESTED") {
        this.pieChartData[2] += 1; 
      }
    });
        
    // This fixes a bug with the bar chart labels not swapping out properly
    setTimeout(() => this.pieChartData = this.pieChartData.slice(), 0);
  }

  private generateOrdersLineChart() {
    var orderMonths = new Array<number>();
    for(var i = 0; i < 12; i++) {
      orderMonths.push(0);
    }
    
    this.orders.forEach(order => {
      orderMonths[order.createdAt.getMonth()] = orderMonths[order.createdAt.getMonth()] + 1;
    });
    orderMonths.reverse();
    this.lineChartData = this.sliceToMonthsBack(orderMonths);
  }

  private generateOrdersBarChart() {
    var data = new Array<number>();
    var labels = new Array<any>();
    for(var i = 0; i < this.barChartCustomers; i++) {
      data.push(0);
      labels.push('Client');
    }

    var ordersByClients : { [key:number]:number; } = {};
    var clients : { [key:number]:Customer; } = {};
    
    this.orders.forEach(order => {
      if (order.client.id in ordersByClients) {
        ordersByClients[order.client.id] += 1;
      } else {
        ordersByClients[order.client.id] = 1;
        clients[order.client.id] = order.client;
      }
    });
    var keys = []; for(var key in ordersByClients) keys.push(key);
    keys.sort(function(a,b){return ordersByClients[a]-ordersByClients[b]});

    var i = 0;
    keys.forEach(element => {
      if (i < data.length) {
        data[i] = ordersByClients[element];
        labels[i] = clients[element].name;
      }
      i++;
    });

    if (labels.length > keys.length) {
      labels = labels.slice(0, keys.length)
    }

    this.barChartLabels = labels;
    this.barChartData = [{data: data, label: 'Series A'}];

    // This fixes a bug with the bar chart labels not swapping out properly
    setTimeout(() => this.barChartLabels = this.barChartLabels.slice(), 0);
  }

  private getComponentsRecursively(components:Array<StorageViewComponent>, component: StorageViewComponent) {
    components.push(component);
    component.components.forEach(childComponent => {
      this.getComponentsRecursively(components, childComponent);
    });
  }

  private sliceToMonthsBack(array:Array<any>): Array<any> {
    var d = new Date();
    var n = d.getMonth();
    var start = n - this.lineChartMonths;
    if (start < 0) {
      var firstMonths = array.slice(0, n+1).reverse();
      var lastMonths = array.slice(array.length+start+1, array.length).reverse();
      array = firstMonths.concat(lastMonths);
    } else {
      array = array.slice(n, n + this.lineChartMonths);
    }
    return array;
  }

}
