import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Intrebare } from 'app/models/intrebare.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ScoalaIntrebare } from 'app/models/scoalaintrebare.model';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-organizare-modal',
  templateUrl: './organizare-modal.component.html',
  styleUrls: ['./organizare-modal.component.css']
})
export class OrganizareModalComponent {


  @ViewChild('organizareModal') modal: ModalDirective;

  intrebari: Intrebare[];

  raspunsuri = [];
  uploaduri = [];
  raspunsuriVe = [];
  uploaduriVe = [];
  toDelete = [];
  progress1: number;
  progress2: number;
  url: any;
  r5B: boolean[] = [false, false, false, false];
  r6B: boolean[] = [false, false, false, false, false, false];
  r7B: boolean[] = [false, false, false, false];
  rL3: boolean[] = [false, false, false];
  adauga: ScoalaIntrebare;

  scoalaId: number;
  chillA = false;


  constructor(private api: ApiService) { }

  show(id: number): void {
    this.progress1 = 0;
    this.progress2 = 0;
    this.chillA = false;
    this.modal.config.keyboard = false;
    this.modal.config.backdrop = "static";
    this.raspunsuri = [];
    this.uploaduri = [];
    this.raspunsuriVe = [];
    this.uploaduriVe = [];
    this.toDelete = [];
    this.scoalaId = id;
    this.getIntrebari();
    this.modal.show();
  }


  getIntrebari() {
    this.api.getIntrebariTip("S")
      .subscribe((intrebari: Intrebare[]) => {
        this.intrebari = intrebari;

        this.intrebari.forEach((intrebare, idx) => {
          this.api.getScoalaIntrebariSI(this.scoalaId, intrebare.id)
            .subscribe((scoalaintrebare: ScoalaIntrebare) => {
              if (scoalaintrebare != null) {
                this.raspunsuri[idx] = scoalaintrebare.raspunsC;
                this.uploaduri[idx] = scoalaintrebare.pathC;
                this.raspunsuriVe[idx] = scoalaintrebare.raspuns;
                this.uploaduriVe[idx] = scoalaintrebare.path;
                if (idx == 11) this.r5B = JSON.parse('[' + this.raspunsuri[idx] + ']');
                if (idx == 12) this.r6B = JSON.parse('[' + this.raspunsuri[idx] + ']');
                if (idx == 13) this.r7B = JSON.parse('[' + this.raspunsuri[idx] + ']');
                if (idx == 28) this.rL3 = JSON.parse('[' + this.raspunsuri[idx] + ']');
              }
              else
              {
                this.raspunsuri[idx] = "";
                this.uploaduri[idx] = "";
                this.raspunsuriVe[idx] = "";
                this.uploaduriVe[idx] = "";
              }
            })
        })
      })
  }


  async editIntrebareA() {

    this.raspunsuri[11] = this.r5B.join(',');
    this.raspunsuri[12] = this.r6B.join(',');
    this.raspunsuri[13] = this.r7B.join(',');
    this.raspunsuri[28] = this.rL3.join(',');
    this.chillA = true;
    for (let intrebare of this.intrebari) {
      await this.api.getScoalaIntrebariSI(this.scoalaId, intrebare.id)
        .toPromise().then((scoalaintrebare: ScoalaIntrebare) => {
          if (scoalaintrebare != null) this.toDelete.push(scoalaintrebare.id);
        })
    }

    for (let id of this.toDelete) {
      await this.api.deleteScoalaIntrebare(id).toPromise();
    }

    for (var i = 0; i < this.raspunsuri.length; i++) {



      this.adauga = new ScoalaIntrebare({
        scoalaId: this.scoalaId,
        intrebareId: this.intrebari[i].id,
        raspuns: this.raspunsuriVe[i],
        raspunsC: this.raspunsuri[i],
        path: this.uploaduriVe[i],
        pathC: this.uploaduri[i],
        data: null
      })

      await this.api.addScoalaIntrebare(this.adauga)
        .toPromise();
    }
    this.modal.hide();

  }

  uploadFile1 = (files) => {

    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.api.uploadFile(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress1 = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {

          this.url = new Object({
            fileUrl: null
          });
          this.url = event.body;
          this.uploaduri[26] = this.url.fileUrl;

        }
      })


  }

  resetProgress1(): void {
    this.progress1 = 0;
  }

  uploadFile2 = (files) => {

    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.api.uploadFile(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress2 = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {

          this.url = new Object({
            fileUrl: null
          });
          this.url = event.body;
          this.uploaduri[21] = this.url.fileUrl;

        }
      })


  }

  resetProgress2(): void {
    this.progress2 = 0;
  }


}




