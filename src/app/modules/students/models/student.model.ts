import { minNumber, prop, required } from '@rxweb/reactive-form-validators';
import { PartnerSubject } from './partner-subject.model';

export class Partner {

    @prop()
    public id: number;

    @required({ message: 'Es requerido' })
    public name: string;

    @required({ message: 'Es requerido' })
    public partnerTypeId: number;      
    public partnerType: PartnerTypes;

    public partnerSubject: PartnerSubject[];
}

export class PartnerTypes {

    @prop()
    public id: number;

    @required({ message: 'Es requerido' })
    public name: string;   
}
