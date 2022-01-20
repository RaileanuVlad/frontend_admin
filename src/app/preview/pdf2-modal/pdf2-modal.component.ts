import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Scoala } from 'app/models/scoala.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../shared/api.service';
import { Unitate } from 'app/models/unitate.model';
import { Clasa } from 'app/models/clasa.model';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { UnitateIntrebare } from 'app/models/unitateIntrebare.model';


@Component({
  selector: 'app-pdf2-modal',
  templateUrl: './pdf2-modal.component.html',
  styleUrls: ['./pdf2-modal.component.css']
})

export class Pdf2ModalComponent {

  @ViewChild('pdf2Modal') modal: ModalDirective;
  scoalaCurenta: Scoala;
  unitati: Unitate[] = [];
  claseUnitate: Clasa[] = [];
  clase: Clasa[][] = [];
  unitateIntrebari: UnitateIntrebare[][] = [];
  isDone = false;
  startedDownloading = false;

  checkboxs5 = ["Da, prin discuția cu părinții",
    "Da, după numele de familie.",
    "Da, prin identificare de către persoane care lucrează pentru comunitate de romi (lider local, mediator școlar, mediator sanitar etc.)",
    "Da, prin constatarea unor semnalmente fizice.",
    "Da, dacă locuiesc în comunitatea de romi.",
    "Da, după limba maternă.",
    "Da, în funcție de participarea la orele de limba romani (dacă există).",
    "Da, în funcție de comportamentul manifestat.",
    "Da, prin declarație semnată de către părinți/tutori/reprezentanți legali a etniei.",
    "Nu știu.",
    "Nu, nu este stabilit.(Explicati de ce in campul urmator)",
    "Nu, nu se colecteaza.(Explicati de ce in campul urmator)"]

  checkboxs6 = ["Da, prin discuția cu părinții",
    "Da, prin identificare de către persoane care lucrează pentru comunitate (lider local, mediator școlar, mediator sanitar etc.",
    "Da, prin constatarea modului de comunicare, de interacțiune.",
    "Da, în funcție de comportamentul manifestat de părinți.",
    "Da, pe baza ocupației pe care o au părinții.",
    "Da, prin declarație semnată de către părinți/tutori/reprezentanți legali privind educația obținută.",
    "Nu știu.",
    "Nu, nu este stabilit.(Explicati de ce in campul urmator)",
    "Nu, nu se colecteaza.(Explicati de ce in campul urmator)"]

  checkboxs7 = ["Da, prin discuția cu părinții",
    "Da, prin identificare de către persoane care lucrează pentru comunitate (lider local, mediator școlar, mediator sanitar etc.)",
    "Da, prin constatarea unor semnalmente fizice.",
    "Da, în funcție de comportamentul manifestat.",
    "Da, pe baza dosarului DGASPC care constată situații medicale speciale sau CES în baza certificatului de orientare CJRAE.",
    "Da, prin declarație privind dizabilitatea semnată de către părinți/tutori/reprezentanți legali.",
    "Nu știu.",
    "Nu, nu este stabilit.(Explicati de ce in campul urmator)",
    "Nu, nu se colecteaza.(Explicati de ce in campul urmator)"]

  i5: boolean[];
  i6: boolean[];
  i7: boolean[];
  i0c: string = "";
  i5c: string = "";
  i6c: string = "";
  i7c: string = "";
  tempJ: number;
  tempI: number;

  constructor(private api: ApiService) { }

  show(scoalaId: number) {
    this.scoalaCurenta = new Scoala();
    this.unitati = [];
    this.claseUnitate = [];
    this.clase = [];
    this.unitateIntrebari = [];

    this.i0c = "";
    this.i5c = "";
    this.i6c = "";
    this.i7c = "";
    this.modal.show();
    this.isDone = false;
    this.startedDownloading = false;
    this.getScoala(scoalaId);

  }



  async getScoala(id: number) {
    await this.api.getScoala(id).toPromise().then((school: Scoala) => {
      this.scoalaCurenta = school;
      this.scoalaCurenta.id = id;
    });

    this.tempI = this.scoalaCurenta.unitateId.length;
    var next = 0;

    for (var i = 0; i < this.tempI; i++) {

      await this.api.getUnitate(this.scoalaCurenta.unitateId[i]).toPromise().then((unit: Unitate) => {
        if (unit.moderator != "1") {
          this.unitati[next] = unit;
          this.unitati[next].id = this.scoalaCurenta.unitateId[i];
          next++;
        }
      })
    }



    for (var i = 0; i < this.unitati.length; i++) {
      this.claseUnitate = [];

      this.unitati[i].clasaId = this.unitati[i].clasaId.concat(this.unitati[i].clasaId2)
      this.tempJ = this.unitati[i].clasaId.length;
      var mext = 0;
      
      for (var j = 0; j < this.tempJ; j++) {

        await this.api.getClasa(this.unitati[i].clasaId[j]).toPromise().then((classs: Clasa) => {
          if (classs.moderator != "1") {
            this.claseUnitate[mext] = classs;
            this.claseUnitate[mext].id = this.unitati[i].clasaId[j];
            mext++;
          }

        })
      }
      this.claseUnitate.sort((c1, c2) => c1.cladireC < c2.cladireC ? -1 : c1.cladireC > c2.cladireC ? 1 : 0);
      this.clase[i] = [...this.claseUnitate];

      if (i == 0) await this.api.getUnitateIntrebariU(this.scoalaCurenta.unitateId[i]).toPromise().then((unitateIntrebari: UnitateIntrebare[]) => {
        this.unitateIntrebari[i] = unitateIntrebari;

        this.i5c = "";
        this.i6c = "";
        this.i7c = "";

        if (this.unitateIntrebari[i][0]) {

          if (this.unitateIntrebari[i][0].raspunsC.indexOf("||") != -1) {
            this.i0c = this.unitateIntrebari[i][0].raspunsC.substring(0, this.unitateIntrebari[i][0].raspunsC.indexOf("||"));
            this.i0c += ": " + this.unitateIntrebari[i][0].raspunsC.substring(this.unitateIntrebari[i][0].raspunsC.indexOf("||") + 2);
            this.unitateIntrebari[i][0].raspuns = this.i0c;
          }
        }

        if (this.unitateIntrebari[i][4]) {


          this.i5 = JSON.parse('[' + this.unitateIntrebari[i][4].raspunsC.substring(0, this.unitateIntrebari[i][4].raspunsC.indexOf("||")) + ']');
          this.i5.forEach((val, idx) => {
            if (val) this.i5c += this.checkboxs5[idx] + " + ";
          })
          this.i5c += "Explicatie: " + this.unitateIntrebari[i][4].raspunsC.substring(this.unitateIntrebari[i][4].raspunsC.indexOf("||") + 2);
          this.unitateIntrebari[i][4].raspuns = this.i5c;
        }

        if (this.unitateIntrebari[i][5]) {

          this.i6 = JSON.parse('[' + this.unitateIntrebari[i][5].raspunsC.substring(0, this.unitateIntrebari[i][5].raspunsC.indexOf("||")) + ']');
          this.i6.forEach((val, idx) => {
            if (val) this.i6c += this.checkboxs6[idx] + " + ";
          })
          this.i6c += "Explicatie: " + this.unitateIntrebari[i][5].raspunsC.substring(this.unitateIntrebari[i][5].raspunsC.indexOf("||") + 2);
          this.unitateIntrebari[i][5].raspuns = this.i6c;
        }

        if (this.unitateIntrebari[i][6]) {

          this.i7 = JSON.parse('[' + this.unitateIntrebari[i][6].raspunsC.substring(0, this.unitateIntrebari[i][6].raspunsC.indexOf("||")) + ']');
          this.i7.forEach((val, idx) => {
            if (val) this.i7c += this.checkboxs7[idx] + " + ";
          })
          this.i7c += "Explicatie: " + this.unitateIntrebari[i][6].raspunsC.substring(this.unitateIntrebari[i][6].raspunsC.indexOf("||") + 2);
          this.unitateIntrebari[i][6].raspuns = this.i7c;
        }

      })


    }





    this.isDone = true;

  }

  public clasTrack(clas: Clasa) { return clas.id; }


  @ViewChild('down2') down2: ElementRef;

  public downloadAsPDF() {

    this.startedDownloading = true;

    const doc = new jsPDF('l');

    const down = this.down2.nativeElement;

    var html = htmlToPdfmake(down.innerHTML);

    const documentDefinition = { info: { title: 'Anexa 2' }, pageSize: 'A4', pageOrientation: 'landscape', content: html };
    pdfMake.createPdf(documentDefinition).open();
    this.modal.hide();
  }



}
