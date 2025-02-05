import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, registerables } from "chart.js";

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: number[] = [];
  @Input() label: string[] = [];
  @Input() title: string = '';

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  getChartConfig(): ChartConfiguration {
    return {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [
          {
            label: this.title,
            data: this.data,
            fill: true,
            borderRadius: 0,
            backgroundColor: 'rgb(82,40,231)',
            borderColor: 'rgb(82,40,231)',
            tension: 0.5
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: { grid: { display: false } },
          y: { grid: { display: false } }
        },
        plugins: {
          legend: { position: 'top' },
          title: { display: false }
        }
      }
    };
  }

  ngOnInit(): void {
    // yahan chart initialize mat karein, kyunki ViewChild abhi set nahi hua hoga
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (this.chartCanvas) {
          this.chart = new Chart(this.chartCanvas.nativeElement, this.getChartConfig());
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
