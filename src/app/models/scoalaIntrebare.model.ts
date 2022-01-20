export class ScoalaIntrebare {
    id: number;
    scoalaId: number;
    intrebareId: number;
    raspuns: string;
    path: string;
    data: string;
    dataC: string;
    pathC: string;
    raspunsC: string;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }
  