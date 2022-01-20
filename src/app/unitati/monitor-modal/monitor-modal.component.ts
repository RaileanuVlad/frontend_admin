import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Intrebare } from 'app/models/intrebare.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ScoalaIntrebare } from 'app/models/scoalaintrebare.model';
import { MonitorIntrebare } from 'app/models/monitorIntrebare.model';
import { AuthService } from 'app/shared/auth.service';
import { HttpEventType } from '@angular/common/http';
import { Unitate } from 'app/models/unitate.model';

@Component({
  selector: 'app-monitor-modal',
  templateUrl: './monitor-modal.component.html',
  styleUrls: ['./monitor-modal.component.css']
})
export class MonitorModalComponent {

  @ViewChild('monitorModal') modal: ModalDirective;

  intrebari: Intrebare[];

  raspunsuri = [];
  raspunsuri2 = [];
  raspunsuri3 = [];
  raspunsuri4 = [];
  uploaduri = [];
  toDelete = [];
  adauga: MonitorIntrebare;
  emptyS:string="";
  progress: number;
  url: any;
  unitateId: number;
  chillMo = false;

  constructor(private api: ApiService, private authService: AuthService) { }

  show(id: number): void {
    this.chillMo = false;
    this.modal.config.keyboard = false;
    this.modal.config.backdrop = "static";
    this.modal.show();
    this.raspunsuri = [];
    this.raspunsuri2 = [];
    this.raspunsuri3 = [];
    this.raspunsuri4 = [];
    this.uploaduri = [];
    this.toDelete = [];
    this.unitateId = id;
    this.getIntrebari();
    console.log(this.raspunsuri);
  }


  getIntrebari() {
    this.api.getIntrebariTip("M")
      .subscribe((intrebari: Intrebare[]) => {
        this.intrebari = intrebari;

        this.intrebari.forEach((intrebare, idx) => {
          this.api.getMonitorIntrebariMIUI(this.unitateId, intrebare.id)
            .subscribe((monitorintrebare: MonitorIntrebare) => {
              if (monitorintrebare != null)
              {
                this.raspunsuri[idx] = monitorintrebare.raspuns;
                this.raspunsuri2[idx] = monitorintrebare.raspuns2;
                this.raspunsuri3[idx] = monitorintrebare.raspuns3;
                this.raspunsuri4[idx] = monitorintrebare.raspuns4;
              }
              else
              {
                this.raspunsuri[idx] = "";
                this.raspunsuri2[idx] = "";
                this.raspunsuri3[idx] = "";
                this.raspunsuri4[idx] = "";
              }
            })
        })
      })
  }


  async editIntrebareM() {

    this.chillMo=true;
    for (let intrebare of this.intrebari) {
      await this.api.getMonitorIntrebariMIUI(this.unitateId, intrebare.id)
        .toPromise().then((monitorintrebare: MonitorIntrebare) => {
          if (monitorintrebare != null) this.toDelete.push(monitorintrebare.id);
        })
    }

    for (let id of this.toDelete) {
      await this.api.deleteMonitorIntrebare(id).toPromise();
    }

    for (var i = 0; i < this.raspunsuri.length; i++) {



      this.adauga = new MonitorIntrebare({
        monitorId: this.authService.currentUserValue.id,
        intrebareId: this.intrebari[i].id,
        raspuns: this.raspunsuri[i],
        raspuns2: this.raspunsuri2[i],
        raspuns3: this.raspunsuri3[i],
        raspuns4: this.raspunsuri4[i],
        unitate: this.unitateId,
        path: null,
        data: null
      })

      await this.api.addMonitorIntrebare(this.adauga)
        .toPromise();
    }
    this.modal.hide();

  }


  uploadFile = (files) => {

    if (files.length === 0)
      return;

    this.api.getUnitate(this.unitateId).subscribe((upldUnit: Unitate) => {

   
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.api.uploadFile(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {

          this.url = new Object({
            fileUrl: null
          });
          this.url = event.body;
          upldUnit.pathChestionar = this.url.fileUrl;
          upldUnit.id = this.unitateId;
          this.api.editUnitate(upldUnit).subscribe(() => { });

        }
      })

    })
  }

  resetProgress(): void {
    this.progress = 0;
  }

}
