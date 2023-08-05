
export interface Report {
    cantidad: number;
    total: number;
    dataByDate: DataByDate[]; 
    totalByStation: TotalByStation[];
}

export interface DataByStation {
    estacion: string;
    estacionId: number;
    cantidad: number;
    total: number;
   
}

export interface DataByDate {
    fecha: string;
    cantidad: number;
    total: number;
    dataByStation: DataByStation[];
}


export interface TotalByStation {   
    cantidad: number;
    total: number;
}