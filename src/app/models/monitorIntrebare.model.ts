export class MonitorIntrebare {
    id: number;
    monitorId: number;
    intrebareId: number;
    raspuns: string;
    raspuns2: string;
    raspuns3: string;
    raspuns4: string;
    data: string;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }
  