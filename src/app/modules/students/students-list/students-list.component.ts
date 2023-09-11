import { Component, OnDestroy, OnInit } from '@angular/core';
import { Partner } from '../models/student.model';
import { PartnerService } from '../services/students.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnDestroy, OnInit {

  public dataSource = new MatTableDataSource<Partner>();
  partnerService: PartnerService;
  public loading = true;
  public subscriptions: Subscription[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.partnerService = new PartnerService(this.http);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.fetchDataGridView();
  }

  delete(row: any): void {
  }

  create(): void {
    this.router.navigate(['main/students/create']);
  }

  edit(row: Partner) {
    this.router.navigate(['main/students/edit', row.id]);
  }

  fetchDataGridView(): void {
    this.loading = true;
    const dataSuscribe = this.partnerService.getStudents();
    const JoinSubscribe = dataSuscribe.subscribe(results => {
      this.dataSource.data = results;
      this.loading = false;
    });
    this.subscriptions.push(JoinSubscribe);
  }
}
