import { Categorias } from "./categorias.model";
import { Sentidos } from "./sentidos.model";
import { Estaciones } from "./estaciones.model";

export interface Recaudos {
    id: number;
    hora: number;
    fecha: Date;
    cantidad: number;
    total: number;
    estacionId: number;
    estacion: Estaciones;
   categoriaId: number;
    categoria: Categorias;
   sentidoId: number;
     sentido: Sentidos;
}
