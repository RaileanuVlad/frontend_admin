import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class SumValidator {
    public sumValidator(): ValidatorFn {
      return (formGroup: FormGroup) => {
        const total = formGroup.get('total');
        const romi = formGroup.get('romi');
        const dizabilitati = formGroup.get('dizabilitati');
        const parinti = formGroup.get('parinti');
        const burse = formGroup.get('burse');
        const repetenti = formGroup.get('repetenti');
        const online = formGroup.get('online');
        const remediala = formGroup.get('remediala');
        const total2b = formGroup.get('total2b');
        const romi2b = formGroup.get('romi2b');
        const dizabilitati2b = formGroup.get('dizabilitati2b');
        const parinti2b = formGroup.get('parinti2b');
        const burse2b = formGroup.get('burse2b');
        const repetenti2b = formGroup.get('repetenti2b');
        const online2b = formGroup.get('online2b');
        const remediala2b = formGroup.get('remediala2b');
        const ani = formGroup.get('ani');
        const litera = formGroup.get('litera');
        const cladire = formGroup.get('cladire');
        const predare = formGroup.get('predare');


        if (!total || !romi || !dizabilitati || !parinti || !burse || !repetenti || !online || !remediala || 
          !total2b || !romi2b || !dizabilitati2b || !parinti2b || !burse2b || !repetenti2b || !online2b || !remediala2b || !ani || !litera || !cladire || !predare){
          return null;
        }

     
        if (ani.value)
        {
            let re = /^\s*[0-8](\s*,\s*[0-8])*\s*$/;
            if(!re.test(ani.value))
            {
              return {errAni: true};
            }
        }

        if (!litera.value)
        {
          return {noLit: true};
        }

        if (!cladire.value)
        {
          return {noCladire: true};
        }

        if (!predare.value)
        {
          return {noPredare: true};
        }

        if (!total.value || total.value <= 0)
        {
            return {totalZero: true};
        }
        if (total2b.value > total.value)
        {
            return {bigTotal2b: true};
        }
        if (total.value < romi.value || total.value < dizabilitati.value || total.value < parinti.value || total.value < burse.value || total.value < repetenti.value || total.value < online.value || total.value < remediala.value) 
        {
            return {smallTotal: true};
        }
        if (total2b.value < romi2b.value || total2b.value < dizabilitati2b.value || total2b.value < parinti2b.value || total2b.value < burse2b.value || total2b.value < repetenti2b.value || total2b.value < online2b.value || total2b.value < remediala2b.value) 
        {
            return {smallTotal2b: true};
        }

        return null;
      };
    }
  }