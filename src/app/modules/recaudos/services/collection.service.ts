import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recaudos } from "../models/recaudos.model";
import { Observable } from "rxjs";
import { Report } from "../models/collection-report.model";
import { Estaciones } from "../models/estaciones.model";

@Injectable({
    providedIn: 'root'
})

export class CollectionService {

    private url: string = "https://localhost:7204";
    constructor( private http: HttpClient){}

    getData(): Observable<Recaudos[]> {
        return this.http.get<Recaudos[]>(`${this.url}/Recaudos/Recaudos`);
    }

    getDataEstaciones(): Observable<Estaciones[]> {
        return this.http.get<Estaciones[]>(`${this.url}/Recaudos/Estaciones`);
    }

    generateDataApi(){
        return this.http.get<boolean>(`${this.url}/Recaudos/DataApi`);
    }

    getReport(date: string){
        return this.http.get<Report>(`${this.url}/Recaudos/Reporte`,  { 
            params: {
              date: date,
            }});
    }
}