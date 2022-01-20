export class Monitor {
  id: number;
  email: string;
  parola: string;
  token?: string;
  judet: string;
  
  constructor(input?: any) {
    Object.assign(this, input);
  }
}
