import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements  OnInit {
  @ViewChild('myForm')  myFormObj : any;
  @ViewChild('box1') box1 : any;
  @ViewChild('box2') box2 : any;
  chart: any;
  // val1 : any;
  // val2 : any;
  ngOnInit(): void {

  }

  onBlur(){
    console.log(this.myFormObj)
    if(this.myFormObj.form.controls['box1'].value <=100  && this.myFormObj.form.controls['box1'].value>= 0){
      this.myFormObj.form.patchValue({
        box2 : (100-this.myFormObj.form.controls['box1'].value)
      })
      this.myFormObj.form.controls['box2'].touched = true
    }

    if(this.myFormObj.form.controls['box2'].value <= 100  && this.myFormObj.form.controls['box2'].value >= 0){
      this.myFormObj.form.patchValue({
        box1 : (100-this.myFormObj.form.controls['box2'].value)
      })
      this.myFormObj.form.controls['box1'].touched = true
    }
  }

  createChart(){
    if(this.chart){
        this.chart.clear();
        this.chart.destroy();
    }
    let val1 =this.myFormObj.form.controls['box1'].value;
    let val2 = this.myFormObj.form.controls['box2'].value;
    console.log(val1, val2)
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: ['Box-1', 'Box-2'],
	       datasets: [{
    label: 'Value',
    data: [val1, val2],
    backgroundColor: [
      '#EC6B56',
      '#47B39C'
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
    this.myFormObj.reset();
  }

}
