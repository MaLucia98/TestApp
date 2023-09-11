
import { Subject } from "../../subjects/models/subject.model";
import { Partner } from "./student.model";
import { prop, required } from "@rxweb/reactive-form-validators";

export class PartnerSubject {

    @prop()
    public id: number;

    @required({ message: 'Es requerido' })
    public studentId: number;      
    public student: Partner;

    @required({ message: 'Es requerido' })
    public subjectId: number;      
    public subject: Subject;
}
