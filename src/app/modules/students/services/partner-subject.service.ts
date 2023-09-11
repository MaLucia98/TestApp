import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PartnerSubject } from "../models/partner-subject.model";
import { Subject } from "../../subjects/models/subject.model";

@Injectable({
    providedIn: 'root'
})

export class PartnerSubjectService {

    private url: string = "https://localhost:7204";
    constructor(private http: HttpClient) { }

    create(model: PartnerSubject): Observable<PartnerSubject> {       
       model.id = 0;
        return this.http.post<PartnerSubject>(`${this.url}/Registrations`, model);
    }

    update(id: number, t: PartnerSubject): Observable<PartnerSubject> {
        return this.http.put<PartnerSubject>(`${this.url}/Registrations` + '/' + id, t, {});
    }

    findById(id: number): Observable<PartnerSubject> {       
        return this.http.get<PartnerSubject>(`${this.url}/Registrations` + '/' + id, { });
    }   

    find(): Observable<PartnerSubject[]> {       
        return this.http.get<PartnerSubject[]>(`${this.url}/Registrations`, { });
    } 

    delete(id: number): Observable<PartnerSubject> {
        return this.http.delete<PartnerSubject>(`${this.url}/Registrations` + '/' + id);
    }

    async getSubjectsAsync(){       
        return this.http.get<Subject[]>(`${this.url}/Registrations/Subjects`, { }).toPromise();
    } 

    getSubjectsByPartner(id: number): Observable<PartnerSubject[]> {       
        return this.http.get<PartnerSubject[]>(`${this.url}/Partner` + '/' + id + '/byPartner', { });
    }
}