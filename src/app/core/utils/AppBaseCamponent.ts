import { FormGroup} from '@angular/forms';

// Componente con validaciones generales
export class AppBaseComponent {
    public isTouchedField = (form: FormGroup|any, field: string): boolean => {
        if (form == null) {
            return false;
        }
        return form?.get(field).touched == true && form?.get(field).invalid;
    }
}