import { PartnerService } from './../services/students.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { PartnerSubject } from '../models/partner-subject.model';
import { PartnerSubjectService } from '../services/partner-subject.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Subject } from '../../subjects/models/subject.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-subjects-form',
  templateUrl: './student-subjects-form.component.html',
  styleUrls: ['./student-subjects-form.component.css']
})
export class StudentSubjectsFormComponent implements OnInit {

  formObj: PartnerSubject;
  partnerSubjectService: PartnerSubjectService;
  partnerService: PartnerService;
  formGroup: FormGroup;
  id: number;
  partnerId: number;
  isNew = true;
  loading = true;
  subjects: Subject[] | undefined;
  partnersSubjects: PartnerSubject[] | undefined;

  public subscriptions: Subscription[] = [];
  
  constructor(private http: HttpClient, private formBuilder: RxFormBuilder, private router: Router,
    public route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialogRef<StudentSubjectsFormComponent>,
    private zone: NgZone,  @Inject(MAT_DIALOG_DATA) public data: any) {
      debugger;
      this.partnerId = Number(data.partnerId)
      if (data.id) {
        this.id = Number(data.id)
      }
    this.partnerSubjectService = new PartnerSubjectService(this.http);
    this.partnerService = new PartnerService(this.http);
  }

  ngOnInit(): void {    
    this.fetchDataFormView();
  }

  async fetchDataFormView(): Promise<void> {
    this.formObj = new PartnerSubject();
    this.formGroup = this.formBuilder.formGroup(this.formObj);
    this.subjects = await this.partnerSubjectService.getSubjectsAsync();
    this.formGroup.patchValue({
      studentId: this.partnerId,
    });
    if (this.id) {
      this.partnerSubjectService.findById(this.id).subscribe(form => {
        this.formGroup.patchValue({
          id: form.id,
          studentId: form.studentId,
          subjectId: form.subjectId,
        });
        this.onSelect();
      });    
    }   
    this.loading = false;
  }

  async submitServer(): Promise<void> {
    const values = this.formGroup.value;
    this.loading = true;
    if (!this.id) {
      this.partnerSubjectService.create(values).subscribe((data: PartnerSubject) => {
          if (data) {
            this.zone.run(() => {
              this.snackBar.open('Operacion Exitosa', '', { panelClass: ['success'] , duration: 3000 , horizontalPosition: 'right', verticalPosition : 'top' });
            });
            this.dialog.close(true);
          }
        },
        err => {
          this.zone.run(() => {
            this.snackBar.open(err, '', { panelClass: ['error'] , duration: 3000 , horizontalPosition: 'right', verticalPosition : 'top' });
          });
          this.loading = false;
        }
      );      
    } else {
      this.partnerSubjectService.update(this.id, values).subscribe((data: PartnerSubject) => {
        if (data) {
          this.zone.run(() => {
            this.snackBar.open('Operacion Exitosa', '', { panelClass: ['success'] , duration: 3000 , horizontalPosition: 'right', verticalPosition : 'top' });
          });
          this.dialog.close(true);
          this.loading = false;
        }
      },
        err => {
          this.zone.run(() => {
            this.snackBar.open(err, '', { panelClass: ['error'] , duration: 3000 , horizontalPosition: 'right', verticalPosition : 'top' });
          });
          this.loading = false;
        }
      );
    }
  } 
  goBack(){
    this.dialog.close(false);
  }
  async onSelect() {
    debugger;
    var subjectId = this.formGroup.value.subjectId;
    if (subjectId) {
      this.partnersSubjects = await this.partnerService.getStudentsBySubject(subjectId);
    }
  }
}
