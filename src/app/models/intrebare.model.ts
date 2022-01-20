export class Intrebare {
    id: number;
    text: string;
    tip: string;
    pentru: string;
    flavor: string;
    upload: boolean;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }
  