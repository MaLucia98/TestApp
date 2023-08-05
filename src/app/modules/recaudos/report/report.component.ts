import { Estaciones } from './../models/estaciones.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { Recaudos } from '../models/recaudos.model';
import { CollectionService } from '../services/collection.service';
import { DataByDate, DataByStation, TotalByStation } from '../models/collection-report.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy, OnInit {

  public dataSource = new MatTableDataSource<DataByDate>();
  collectionService: CollectionService;
  public loading = true;
  public subscriptions: Subscription[] = [];
  public total: number;
  public quatity: number;
  filterStartDateI: Date;
  columns: string[];
  estaciones: Estaciones[]; 
  totals: TotalByStation[]; 

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.collectionService = new CollectionService(this.http);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.fetchDataGridView();
  }

  delete(row: any): void {
  }

  filterChange(): void {
    this.fetchDataGridView();
  }
  clearDateRange() {

  }
  fetchDataGridView(): void {
    this.columns = [];
    if (this.filterStartDateI) {
      this.loading = true;
      const year = this.filterStartDateI.getFullYear();
      const month = (this.filterStartDateI.getMonth() + 1).toString().padStart(2, '0');
      const day = this.filterStartDateI.getDate().toString().padStart(2, '0');
      var date = `${year}-${month}-${day}`;
      var estacionesSuscribe = this.collectionService.getDataEstaciones();
      const dataSuscribe = this.collectionService.getReport(date == null ? "2023-08-01" : date);
      const JoinSubscribe = forkJoin([estacionesSuscribe, dataSuscribe]).subscribe(results => {
        this.dataSource.data = results[1].dataByDate;
        this.total = results[1].total;
        this.quatity = results[1].cantidad;
        this.totals = results[1].totalByStation;
        this.estaciones = results[0];      
        this.columns = ['fecha'];
        this.estaciones.forEach(x =>{
          this.columns.push(x.name);
        })
        this.loading = false;
      });
      this.subscriptions.push(JoinSubscribe);
    } else {
      this.loading = false;
    }
  }
  getTotal(colIndex: number) {
    return this.dataSource.data[colIndex].total;
  }
  getCantidad(colIndex: number) {
    return this.dataSource.data[colIndex].cantidad;
  }
}

