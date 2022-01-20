import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Intrebare } from 'app/models/intrebare.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UnitateIntrebare } from 'app/models/unitateintrebare.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-extra-unitate-modal',
  templateUrl: './extra-unitate-modal.component.html',
  styleUrls: ['./extra-unitate-modal.component.css']
})
export class ExtraUnitateModalComponent {

  @ViewChild('extraUnitateModal') modal: ModalDirective;



  intrebari: Intrebare[];

  raspunsuri = [];
  raspunsuriVechi = [];
  uploaduri = [];
  toDelete = [];

  i5: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false];
  i6: boolean[] = [false, false, false, false, false, false, false, false, false];
  i7: boolean[] = [false, false, false, false, false, false, false, false, false];

  adauga: UnitateIntrebare;

  unitateId: number;
  chillE = false;
  popup4 = true;


  constructor(private api: ApiService) { }

  show(id: number): void {
    this.popup4=true;
    this.chillE = false;
    this.modal.config.keyboard = false;
    this.modal.config.backdrop = "static";
    this.modal.show();
    this.raspunsuri = [];
    this.raspunsuriVechi = [];
    this.uploaduri = [];
    this.toDelete = [];
    this.unitateId = id;
    this.getIntrebari();
    
    
  }


  getIntrebari() {
    this.api.getIntrebariTip("U")
      .subscribe((intrebari: Intrebare[]) => {
        this.intrebari = intrebari;

        this.intrebari.forEach((intrebare, idx) => {
          this.api.getUnitateIntrebariUI(this.unitateId, intrebare.id)
            .subscribe((unitateIntrebare: UnitateIntrebare) => {
              if (unitateIntrebare != null)
              {
                this.raspunsuriVechi[idx] = unitateIntrebare.raspuns;
                if(unitateIntrebare.raspunsC.indexOf("||") == -1)
                {
                  this.raspunsuri[idx] = unitateIntrebare.raspunsC;
                  this.uploaduri[idx] = "";
                }
                else
                {
                  this.raspunsuri[idx] = unitateIntrebare.raspunsC.substring(0, unitateIntrebare.raspunsC.indexOf("||"));
                  if(idx == 4) this.i5 = JSON.parse('[' + this.raspunsuri[4] + ']');
                  if(idx == 5) this.i6 = JSON.parse('[' + this.raspunsuri[5] + ']');
                  if(idx == 6) this.i7 = JSON.parse('[' + this.raspunsuri[6] + ']');
                  this.uploaduri[idx] = unitateIntrebare.raspunsC.substring(unitateIntrebare.raspunsC.indexOf("||")+2);
                }
               
              }
              else
              {
                this.raspunsuriVechi[idx] = "";
                this.raspunsuri[idx] = "";
                this.uploaduri[idx] = "";
              }

            })
        })
      })
  }


  async editIntrebareU() {


    this.chillE = true;
    this.raspunsuri[0] = this.raspunsuri[0] + "||";
    this.raspunsuri[4] = this.i5.toString() + "||";
    this.raspunsuri[5] = this.i6.toString() + "||";
    this.raspunsuri[6] = this.i7.toString() + "||";
    

    for (let intrebare of this.intrebari) {
      await this.api.getUnitateIntrebariUI(this.unitateId, intrebare.id)
        .toPromise().then((unitateIntrebare: UnitateIntrebare) => {
          if (unitateIntrebare != null) this.toDelete.push(unitateIntrebare.id);
        })
    }

    for (let id of this.toDelete) {
      await this.api.deleteUnitateIntrebare(id).toPromise();
    }

    for (var i = 0; i < this.raspunsuri.length; i++) {

      this.adauga = new UnitateIntrebare({
        unitateId: this.unitateId,
        intrebareId: this.intrebari[i].id,
        raspuns: this.raspunsuriVechi[i],
        raspunsC: this.raspunsuri[i] + this.uploaduri[i],
        path: null,
        data: null, 
        dataC: "da"
      })

      await this.api.addUnitateIntrebare(this.adauga)
        .toPromise();
    }

    this.modal.hide();

  }

  uncheckNu5(){
    this.i5[9]=false;
    this.i5[10]=false;
    this.i5[11]=false;
  }

  uncheckNu6(){
    this.i6[6]=false;
    this.i6[7]=false;
    this.i6[8]=false;
  }

  uncheckNu7(){
    this.i7[6]=false;
    this.i7[7]=false;
    this.i7[8]=false;
  }

  uncheckDa51(){
    this.i5[0]=false;
    this.i5[1]=false;
    this.i5[2]=false;
    this.i5[3]=false;
    this.i5[4]=false;
    this.i5[5]=false;
    this.i5[6]=false;
    this.i5[7]=false;
    this.i5[8]=false;
    this.i5[10]=false;
    this.i5[11]=false;
  }

  uncheckDa52(){
    this.i5[0]=false;
    this.i5[1]=false;
    this.i5[2]=false;
    this.i5[3]=false;
    this.i5[4]=false;
    this.i5[5]=false;
    this.i5[6]=false;
    this.i5[7]=false;
    this.i5[8]=false;
    this.i5[9]=false;
    this.i5[11]=false;
  }

  uncheckDa53(){
    this.i5[0]=false;
    this.i5[1]=false;
    this.i5[2]=false;
    this.i5[3]=false;
    this.i5[4]=false;
    this.i5[5]=false;
    this.i5[6]=false;
    this.i5[7]=false;
    this.i5[8]=false;
    this.i5[9]=false;
    this.i5[10]=false;
  }

  uncheckDa61(){
    this.i6[0]=false;
    this.i6[1]=false;
    this.i6[2]=false;
    this.i6[3]=false;
    this.i6[4]=false;
    this.i6[5]=false;
    this.i6[7]=false;
    this.i6[8]=false;
  }

  uncheckDa62(){
    this.i6[0]=false;
    this.i6[1]=false;
    this.i6[2]=false;
    this.i6[3]=false;
    this.i6[4]=false;
    this.i6[5]=false;
    this.i6[6]=false;
    this.i6[8]=false;
  }

  uncheckDa63(){
    this.i6[0]=false;
    this.i6[1]=false;
    this.i6[2]=false;
    this.i6[3]=false;
    this.i6[4]=false;
    this.i6[5]=false;
    this.i6[6]=false;
    this.i6[7]=false;
  }

  uncheckDa71(){
    this.i7[0]=false;
    this.i7[1]=false;
    this.i7[2]=false;
    this.i7[3]=false;
    this.i7[4]=false;
    this.i7[5]=false;
    this.i7[7]=false;
    this.i7[8]=false;
  }

  uncheckDa72(){
    this.i7[0]=false;
    this.i7[1]=false;
    this.i7[2]=false;
    this.i7[3]=false;
    this.i7[4]=false;
    this.i7[5]=false;
    this.i7[6]=false;
    this.i7[8]=false;
  }

  uncheckDa73(){
    this.i7[0]=false;
    this.i7[1]=false;
    this.i7[2]=false;
    this.i7[3]=false;
    this.i7[4]=false;
    this.i7[5]=false;
    this.i7[6]=false;
    this.i7[7]=false;
  }

}
