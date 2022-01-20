export class UnitateIntrebare {
    id: number;
    unitateId: number;
    intrebareId: number;
    raspuns: string;
    path: string;
    data: string;
    raspunsC: string;
    pathC: string;
    dataC: string;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }
  