import { Component, NgZone, OnInit } from '@angular/core';
import { Partner, PartnerTypes } from '../models/student.model';
import { PartnerService } from '../services/students.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {

  formObj: Partner;
  partnerService: PartnerService;
  formGroup: FormGroup;
  id: number;
  isNew = true;
  loading = true;
  public subscriptions: Subscription[] = [];
  
  constructor(private http: HttpClient, private formBuilder: RxFormBuilder, private router: Router,
    public route: ActivatedRoute, public snackBar: MatSnackBar,
    private zone: NgZone) {
    this.partnerService = new PartnerService(this.http);
  }

  ngOnInit(): void {
    const routerMapSubscriber = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('id'))
      )
    ).subscribe((data) => {
      if (data && (!isNaN(Number(data)))) {
        this.isNew = false;
        this.id = Number(data);
      }
    });
    this.subscriptions.push(routerMapSubscriber);
    this.fetchDataFormView();
  }

  async fetchDataFormView(): Promise<void> {
    this.formObj = new Partner();
    this.formGroup = this.formBuilder.formGroup(this.formObj);
    this.formGroup.patchValue({
      partnerTypeId: 1,
    });
    if (this.id) {
      this.partnerService.findById(this.id).subscribe(form => {
        this.formGroup.patchValue({
          id: form.id,
          name: form.name,
          partnerTypeId: form.partnerTypeId,
        });
      });
    }
    this.loading = false;
  }

  async submitServer(): Promise<void> {
    const values = this.formGroup.value;
    this.loading = true;
    if (!this.id) {
      this.partnerService.create(values).subscribe((data: Partner) => {
          if (data) {
            this.zone.run(() => {
              this.snackBar.open('Operacion Exitosa', '', { panelClass: ['success'] , duration: 3000 , horizontalPosition: 'right', verticalPosition : 'top' });
            });
            this.router.navigate(['main/students/edit', data.id]);   
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
      this.partnerService.update(this.id, values).subscribe((data: Partner) => {
        if (data) {
          this.zone.run(() => {
            this.snackBar.open('Operacion Exitosa', '', { panelClass: ['success'] , duration: 3000 , horizontalPosition: 'right', verticalPosition : 'top' });
          });
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
  goBack() {
    this.router.navigate(['main/students']);
  }
}
