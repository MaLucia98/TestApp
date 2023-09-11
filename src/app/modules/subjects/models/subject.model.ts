import { minNumber, prop, required } from '@rxweb/reactive-form-validators';
import { Partner } from '../../students/models/student.model';

export class Subject {

    @prop()
    public id: number;

    @prop()
    public name: string;

    @prop()
    public credits: number;

    @prop()
    public teacherId: number;      
    public teacher: Partner;   

}


