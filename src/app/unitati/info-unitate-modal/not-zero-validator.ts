import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NotZeroValidator {
    public notZeroValidator(): ValidatorFn {
        return (formGroup: FormGroup) => {

          
            const nivel = formGroup.get('nivel');
            const litera0 = formGroup.get('litera0');
            const litera1 = formGroup.get('litera1');
            const litera2 = formGroup.get('litera2');
            const litera3 = formGroup.get('litera3');
            const litera4 = formGroup.get('litera4');
            const litera5 = formGroup.get('litera5');
            const litera6 = formGroup.get('litera6');
            const litera7 = formGroup.get('litera7');
            const litera8 = formGroup.get('litera8');
            const numarM = formGroup.get('numarM');



            if (!nivel || !litera0 || !litera1 || !litera2 || !litera3 || !litera4 || !litera5 || !litera6 || !litera7 || !litera8 || !numarM) {
                return null;
            }


            
            if (nivel.value == "Școală primară")
                if (litera0.value == "" || litera1.value == "" || litera2.value == "" || litera3.value == "" || litera4.value == "") {
                    return { notComplet: true };
                }

            if (nivel.value == "Școală gimnazială")
                if (litera5.value == "" || litera6.value == "" || litera7.value == "" || litera8.value == "") {
                    return { notComplet: true };
                }

            if (nivel.value == "Șc Primară și Șc. Gimnazială")
                if (litera0.value == "" || litera1.value == "" || litera2.value == "" || litera3.value == "" || litera4.value == "" || litera5.value == "" || litera6.value == "" || litera7.value == "" || litera8.value == "") {
                    return { notComplet: true };
                }

            if (numarM.value == "")
            {
                return {notMixt: true};
            }
            return null;

        };
    }
}