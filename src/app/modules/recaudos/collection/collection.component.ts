import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Recaudos } from '../models/recaudos.model';
import { MatTableDataSource } from '@angular/material/table';
import { CollectionService } from '../services/collection.service';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [CollectionService]
})
export class CollectionComponent implements OnInit, OnDestroy, OnInit {

  public dataSource = new MatTableDataSource<Recaudos>();
  collectionService: CollectionService;
  public loading = true;
  public subscriptions: Subscription[] = [];
  public size = 5;
  public pageNumber = 0;
  public totalRegister = 0;
  filterDate: Date = new Date;
  
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

  getReport(): void {
    this.router.navigate(['main/recaudos/report']);
  }
 
  generateData(): void {
    const dataSuscribe = this.collectionService.generateDataApi();
    const JoinSubscribe = dataSuscribe.subscribe(results => {     
      this.loading = false;
    });
    this.subscriptions.push(JoinSubscribe);
  }
  fetchDataGridView(): void {
    this.loading = true;
    const dataSuscribe = this.collectionService.getData();
    const JoinSubscribe = dataSuscribe.subscribe(results => {
      this.dataSource.data = results;
      this.loading = false;
    });
    this.subscriptions.push(JoinSubscribe);
  }
}
