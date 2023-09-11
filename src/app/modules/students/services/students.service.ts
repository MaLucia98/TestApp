import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Partner } from "../models/student.model";
import { PartnerSubject } from "../models/partner-subject.model";

@Injectable({
    providedIn: 'root'
})

export class PartnerService {

    private url: string = "https://localhost:7204";
    constructor(private http: HttpClient) { }

    create(model: Partner): Observable<Partner> {       
       model.id = 0;
        return this.http.post<Partner>(`${this.url}/Partner`, model);
    }

    update(id: number, t: Partner): Observable<Partner> {
        return this.http.put<Partner>(`${this.url}/Partner` + '/' + id, t, {});
    }

    findById(id: number): Observable<Partner> {       
        return this.http.get<Partner>(`${this.url}/Partner` + '/' + id, { });
    }   

    find(): Observable<Partner[]> {       
        return this.http.get<Partner[]>(`${this.url}/Partner`, { });
    } 

    delete(id: number): Observable<Partner> {
        return this.http.delete<Partner>(`${this.url}/Partner` + '/' + id);
    }

    getStudents(): Observable<Partner[]> {       
        return this.http.get<Partner[]>(`${this.url}/Partner/students`, { });
    } 

    async getStudentsBySubject(id:number) {       
        return this.http.get<PartnerSubject[]>(`${this.url}/Partner` + '/' + id + '/bySubject', { }).toPromise();
    } 
}