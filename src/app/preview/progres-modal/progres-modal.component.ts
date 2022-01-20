import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../shared/api.service';
import { Progres } from 'app/models/progres.model';

@Component({
  selector: 'app-progres-modal',
  templateUrl: './progres-modal.component.html',
  styleUrls: ['./progres-modal.component.css']
})
export class ProgresModalComponent{

  @ViewChild('progresModal') modal: ModalDirective;
  
  progres: Progres;
  pTotal: number;
  tTotal: number;

  constructor(private api: ApiService) { }

  show() {

    this.api.getProgres().subscribe((pogres: Progres)=>{
      this.progres = pogres;
      this.pTotal = pogres.pBotosani + pogres.pBrasov + pogres.pBucuresti + pogres.pCluj + pogres.pConstanta + pogres.pIalomita + pogres.pIasi + pogres.pMaramures + pogres.pMures + pogres.pPrahova + pogres.pSuceava;
      this.tTotal = pogres.tBotosani + pogres.tBrasov + pogres.tBucuresti + pogres.tCluj + pogres.tConstanta + pogres.tIalomita + pogres.tIasi + pogres.tMaramures + pogres.tMures + pogres.tPrahova + pogres.tSuceava;
    });
    this.modal.show();

  }




}


