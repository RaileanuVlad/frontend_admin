export class Unitate {

  id: number;
  localitate: string;
  nume: string;
  statut: string;
  nivel: string;
  strada: string;
  nrStrada: string;
  codPostal: string;
  telefon: string;
  fax: string;
  total: string;
  romi: string;
  dizabilitati: string;
  parinti: string;
  burse: string;
  repetenti: string;
  online: string;
  remediala: string;
  nrCladiri: number;
  scoalaId: number;
  clasaId: number[];
  clasaId1: number[];
  clasaId2: number[];
  clasaNume: string[];
  clasaNume1: string[];
  clasaNume2: string[];
  clasaNumeC: string[];
  clasaNume1C: string[];
  clasaNume2C: string[];
  clasaCount: string[];
  clasaCount1: string[];
  clasaCount2: string[];
  clasaModerator: string[];
  burseC: string;
  dizabilitatiC: string;
  nivelC: string;
  nrCladiriC: number;
  onlineC: string;
  parintiC: string;
  remedialaC: string;
  repetentiC: string;
  romiC: string;
  romiE: string;
  pathChestionar: string;
  totalC: string;
  moderator: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
