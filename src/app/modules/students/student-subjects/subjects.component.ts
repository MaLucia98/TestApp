import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {  Subscription, of, switchMap } from 'rxjs';
import { Partner } from '../models/student.model';
import { PartnerService } from '../services/students.service';
import { PartnerSubject } from '../models/partner-subject.model';
import { PartnerSubjectService } from '../services/partner-subject.service';
import { Subject } from '../../subjects/models/subject.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentSubjectsFormComponent } from '../student-subjects-form/student-subjects-form.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy, OnInit {

  public dataSource = new MatTableDataSource<PartnerSubject>();
  partnerSubjectService: PartnerSubjectService;
  public loading = true;
  public subscriptions: Subscription[] = [];
  id: number;
  component: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
    private dialog: MatDialog, public snackBar: MatSnackBar,
    private zone: NgZone) {
    this.component = StudentSubjectsFormComponent;
    this.partnerSubjectService = new PartnerSubjectService(this.http);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    const routerMapSubscriber = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('id'))
      )
    ).subscribe((data) => {
      if (data && (!isNaN(Number(data)))) {
        this.id = Number(data);
      }
    });
    this.subscriptions.push(routerMapSubscriber);
    this.fetchDataGridView();
  }


  fetchDataGridView(): void {
    this.loading = true;
    const dataSuscribe = this.partnerSubjectService.getSubjectsByPartner(this.id);
    const JoinSubscribe = dataSuscribe.subscribe(results => {
      debugger;
      this.dataSource.data = results;
      this.loading = false;
    });
    this.subscriptions.push(JoinSubscribe);
  }

  openDialog(id?: number) {
    this.dialog.open(this.component,
        {autoFocus: true, disableClose: true,
            data: {id, partnerId: this.id
            },
        })
        .afterClosed()
        .subscribe(() => {
            this.fetchDataGridView();
        });
}

async edit(row: any) {
    this.openDialog(row.id);
}

async add() {
    this.openDialog();
}

async delete(row: PartnerSubject) {
  this.loading = true;
  this.partnerSubjectService.delete(row.id).subscribe((data: any) => {
    this.loading = false;
    this.zone.run(() => {
      this.snackBar.open('Operacion Exitosa', '', { panelClass: ['success'] , duration: 3000 , horizontalPosition: 'right', verticalPosition : 'top' });
    });
    this.fetchDataGridView();
  },
    err => {

      this.loading = false;
    });
}
}
